import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Home from "../src/app/page";

const mockPush = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

vi.mock("gsap");
vi.mock("gsap/all");
vi.mock("@gsap/react", () => ({
  useGSAP: () => ({
    contextSafe: (fn: any) => fn,
  }),
}));

describe("Home Page - Product List", () => {
  const mockProducts = [
    {
      id: 1,
      title: "Blue Jeans",
      slug: "blue-jeans",
      price: 50,
      description: "Comfortable blue jeans",
      images: [""],
      category: {
        id: 1,
        name: "Clothing",
        slug: "clothing",
        image: "",
        creationAt: "2024-01-01",
        updatedAt: "2024-01-01",
      },
      creationAt: "2024-01-01",
      updatedAt: "2024-01-01",
    },
    {
      id: 2,
      title: "Red Shirt",
      slug: "red-shirt",
      price: 30,
      description: "Stylish red shirt",
      images: [""],
      category: {
        id: 1,
        name: "Clothing",
        slug: "clothing",
        image: "",
        creationAt: "2024-01-01",
        updatedAt: "2024-01-01",
      },
      creationAt: "2024-01-01",
      updatedAt: "2024-01-01",
    },
    {
      id: 3,
      title: "Green Hoodie",
      slug: "green-hoodie",
      price: 45,
      description: "Warm green hoodie",
      images: [""],
      category: {
        id: 1,
        name: "Clothing",
        slug: "clothing",
        image: "",
        creationAt: "2024-01-01",
        updatedAt: "2024-01-01",
      },
      creationAt: "2024-01-01",
      updatedAt: "2024-01-01",
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();

    global.fetch = vi.fn().mockResolvedValue({
      json: async () => mockProducts,
    });
  });

  it("renders home page", () => {
    render(<Home />);
    expect(screen.getByText(/BROWSE PRODUCTS/i)).toBeInTheDocument();
  });

  it("fetches and displays products on load", async () => {
    render(<Home />);
    await waitFor(() => {
      expect(screen.getByText("Blue Jeans")).toBeInTheDocument();
    });
    expect(screen.getByText("Red Shirt")).toBeInTheDocument();
    expect(screen.getByText("Green Hoodie")).toBeInTheDocument();
    expect(global.fetch).toHaveBeenCalledWith(
      "https://api.escuelajs.co/api/v1/products"
    );
  });

  it("displays product details (title, price, category)", async () => {
    render(<Home />);
    await waitFor(() => {
      expect(screen.getByText("Blue Jeans")).toBeInTheDocument();
    });
    expect(screen.getByText("€ 50")).toBeInTheDocument();
    const categories = screen.getAllByText("Clothing");
    expect(categories.length).toBeGreaterThan(0);
  });

  it("renders search input", () => {
    render(<Home />);
    const searchInput = screen.getByPlaceholderText(/SEARCH PRODUCTS/i);
    expect(searchInput).toBeInTheDocument();
  });

  it("filters products based on search input", async () => {
    const user = userEvent.setup();
    render(<Home />);

    await waitFor(() => {
      expect(screen.getByText("Blue Jeans")).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText(/SEARCH PRODUCTS/i);
    await user.type(searchInput, "blue");

    await waitFor(
      () => {
        expect(screen.getByText("Blue Jeans")).toBeInTheDocument();
        expect(screen.queryByText("Red Shirt")).not.toBeInTheDocument();
        expect(screen.queryByText("Green Hoodie")).not.toBeInTheDocument();
      },
      { timeout: 1000 }
    );
  });

  it("search is case-insensitive", async () => {
    const user = userEvent.setup();
    render(<Home />);
    await waitFor(() => {
      expect(screen.getByText("Blue Jeans")).toBeInTheDocument();
    });
    const searchInput = screen.getByPlaceholderText(/SEARCH PRODUCTS/i);
    await user.type(searchInput, "BLUE"); // Uppercase
    await waitFor(
      () => {
        expect(screen.getByText("Blue Jeans")).toBeInTheDocument();
      },
      { timeout: 1000 }
    );
  });

  it("shows all products when search is cleared", async () => {
    const user = userEvent.setup();
    render(<Home />);
    await waitFor(() => {
      expect(screen.getByText("Blue Jeans")).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText(/SEARCH PRODUCTS/i);

    await user.type(searchInput, "blue");
    await waitFor(
      () => {
        expect(screen.queryByText("Red Shirt")).not.toBeInTheDocument();
      },
      { timeout: 1000 }
    );

    await user.clear(searchInput);

    await waitFor(
      () => {
        expect(screen.getByText("Blue Jeans")).toBeInTheDocument();
        expect(screen.getByText("Red Shirt")).toBeInTheDocument();
        expect(screen.getByText("Green Hoodie")).toBeInTheDocument();
      },
      { timeout: 1000 }
    );
  });

  it("renders pagination component and works perfectly with multiple products", async () => {
    const products: typeof mockProducts = [];
    for (let i = 1; i <= 20; i++) {
      products.push({ ...mockProducts[0], id: i, title: `Product ${i}` });
    }

    global.fetch = vi.fn().mockResolvedValue({ json: async () => products });

    render(<Home />);
    await waitFor(() => screen.getByText("Product 1"));

    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.getByText("Product 9")).toBeInTheDocument();
    expect(screen.queryByText("Product 10")).not.toBeInTheDocument();

    const page2Button = screen.getAllByText("2");
    const user = userEvent.setup();
    await user.click(page2Button[0]);
    await waitFor(() => screen.getByText("Product 10"));

    expect(screen.getByText("Product 10")).toBeInTheDocument();
    expect(screen.getByText("Product 18")).toBeInTheDocument();
    expect(screen.queryByText("Product 9")).not.toBeInTheDocument();
    expect(screen.queryByText("Product 19")).not.toBeInTheDocument();

    const page3Button = screen.getAllByText("3");
    await user.click(page3Button[0]);
    await waitFor(() => screen.getByText("Product 19"));
    expect(screen.getByText("Product 19")).toBeInTheDocument();
    expect(screen.getByText("Product 20")).toBeInTheDocument();
    expect(screen.queryByText("Product 18")).not.toBeInTheDocument();

    const pageFirstButton = screen.getAllByText("<<");
    await user.click(pageFirstButton[0]);
    await waitFor(() => screen.getByText("Product 1"));
    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.getByText("Product 9")).toBeInTheDocument();

    const pageLastButton = screen.getAllByText(">>");
    await user.click(pageLastButton[0]);
    await waitFor(() => screen.getByText("Product 20"));
    expect(screen.getByText("Product 20")).toBeInTheDocument();
    expect(screen.getByText("Product 19")).toBeInTheDocument();
  });

  it("navigates to product details when product is clicked", async () => {
    const user = userEvent.setup();
    render(<Home />);
    await waitFor(() => {
      expect(screen.getByText("Blue Jeans")).toBeInTheDocument();
    });
    const productCard = screen.getByText("Blue Jeans").closest(".product-card");
    await user.click(productCard!);
    expect(mockPush).toHaveBeenCalledWith("/product/1");
  });

  it("handles fetch errors without crashing", async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error("API Error"));
    render(<Home />);
    await new Promise((resolve) => setTimeout(resolve, 100));
    expect(screen.getByText(/BROWSE PRODUCTS/i)).toBeInTheDocument();
  });

  it("search works correctly", async () => {
    const products: typeof mockProducts = [];
    for (let i = 1; i <= 20; i++) {
      products.push({ ...mockProducts[0], id: i, title: `Product ${i}` });
    }
    vi.clearAllMocks();
    global.fetch = vi.fn().mockResolvedValue({ json: async () => products });

    const user = userEvent.setup();

    render(<Home />);
    await waitFor(() => screen.getByText("Product 1"));
    const page2Button = screen.getAllByText("2");
    await user.click(page2Button[0]);
    await waitFor(() => screen.getByText("Product 10"));
    const searchInput = screen.getByPlaceholderText(/SEARCH PRODUCTS/i);
    await user.type(searchInput, "Product 2");
    await new Promise((resolve) => setTimeout(resolve, 600));
    await waitFor(() => {
      expect(screen.getByText("Product 2")).toBeInTheDocument();
      expect(screen.getByText("Product 20")).toBeInTheDocument();
    });

    expect(screen.queryByText("Product 5")).not.toBeInTheDocument();
    expect(screen.queryByText("Product 10")).not.toBeInTheDocument();
  });
});
