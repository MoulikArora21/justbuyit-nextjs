import { render, screen } from "@testing-library/react";
import Paginator from "../src/components/common/Paginator";
import userEvent from "@testing-library/user-event";

describe("Paginator", () => {
  it("renders current page number", () => {
    render(<Paginator page={3} maxPage={10} setPage={() => {}} />);

    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("shows previous and next page buttons when not at edges", () => {
    render(<Paginator page={5} maxPage={10} setPage={() => {}} />);

    expect(screen.getByText("4")).toBeInTheDocument();
    expect(screen.getByText("6")).toBeInTheDocument();
    expect(screen.getByText("<<")).toBeInTheDocument();
    expect(screen.getByText(">>")).toBeInTheDocument();
  });

  it("hides first/previous buttons on page 1", () => {
    render(<Paginator page={1} maxPage={10} setPage={() => {}} />);

    expect(screen.queryByText("<<")).not.toBeInTheDocument();
    expect(screen.queryByText("0")).not.toBeInTheDocument();
    expect(screen.queryByText("1")).toBeInTheDocument();
    expect(screen.queryByText("2")).toBeInTheDocument();
    expect(screen.queryByText(">>")).toBeInTheDocument();
  });

  it("does not show next/last buttons on last page", () => {
    render(<Paginator page={10} maxPage={10} setPage={vi.fn()} />);

    expect(screen.getByText("9")).toBeInTheDocument();
    expect(screen.getByText("<<")).toBeInTheDocument();
    expect(screen.queryByText("11")).not.toBeInTheDocument();
    expect(screen.queryByText(">>")).not.toBeInTheDocument();
  });

  it("shows all navigation buttons on middle pages", () => {
    render(<Paginator page={5} maxPage={10} setPage={vi.fn()} />);

    // Should show:
    expect(screen.getByText("<<")).toBeInTheDocument(); // First page
    expect(screen.getByText("4")).toBeInTheDocument(); // Previous
    expect(screen.getByText("5")).toBeInTheDocument(); // Current
    expect(screen.getByText("6")).toBeInTheDocument(); // Next
    expect(screen.getByText(">>")).toBeInTheDocument(); // Last page
  });

  it("calls setPage with previous page when previous button clicked", async () => {
    const user = userEvent.setup();
    const mockSetPage = vi.fn();
    render(<Paginator page={5} maxPage={10} setPage={mockSetPage} />);
    const prevButton = screen.getByText("4");
    await user.click(prevButton);
    expect(mockSetPage).toHaveBeenCalledWith(4);
    expect(mockSetPage).toHaveBeenCalledTimes(1);
  });

  it("calls setPage with next page when next button clicked", async () => {
    const user = userEvent.setup();
    const mockSetPage = vi.fn();
    render(<Paginator page={5} maxPage={10} setPage={mockSetPage} />);
    const nextButton = screen.getByText("6");
    await user.click(nextButton);
    expect(mockSetPage).toHaveBeenCalledWith(6);
    expect(mockSetPage).toHaveBeenCalledTimes(1);
  });

  it("calls setPage with 1 when first page button clicked", async () => {
    const user = userEvent.setup();
    const mockSetPage = vi.fn();
    render(<Paginator page={5} maxPage={10} setPage={mockSetPage} />);
    const firstButton = screen.getByText("<<");
    await user.click(firstButton);
    expect(mockSetPage).toHaveBeenCalledWith(1);
  });

  it("calls setPage with maxPage when last page button clicked", async () => {
    const user = userEvent.setup();
    const mockSetPage = vi.fn();
    render(<Paginator page={5} maxPage={10} setPage={mockSetPage} />);
    const lastButton = screen.getByText(">>");
    await user.click(lastButton);
    expect(mockSetPage).toHaveBeenCalledWith(10);
  });

  it("shows only current page when maxPage is 1", () => {
    render(<Paginator page={1} maxPage={1} setPage={vi.fn()} />);
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.queryByText("<<")).not.toBeInTheDocument();
    expect(screen.queryByText(">>")).not.toBeInTheDocument();
    expect(screen.queryByText("0")).not.toBeInTheDocument();
    expect(screen.queryByText("2")).not.toBeInTheDocument();
  });
});
