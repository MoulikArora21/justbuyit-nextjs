import { renderHook, waitFor } from "@testing-library/react";
import useDebounce from "../src/hooks/useDebounce";

describe("useDebounce Hook", () => {
  it("should return initial value immediately", () => {
    const { result } = renderHook(() => useDebounce("initial", 500));
    expect(result.current).toBe("initial");
  });

  it("should debounce value changes after delay", async () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: "initial", delay: 500 } }
    );
    expect(result.current).toBe("initial"); // Initial value
    rerender({ value: "updated", delay: 500 }); // new value with rerender
    expect(result.current).toBe("initial"); // Still initial before debounce
    await waitFor(() => expect(result.current).toBe("updated"), {
      timeout: 600,
    }); // Wait for debounce to complete, should update to 'updated'
  });

  it("should cancel previous searches on fast typing", async () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 300), // 300ms debounce
      { initialProps: { value: "first" } }
    );

    rerender({ value: "second" }); // new value with rerender
    await new Promise((resolve) => setTimeout(resolve, 100)); // wait 100ms
    rerender({ value: "third" }); // new value with rerender
    await new Promise((resolve) => setTimeout(resolve, 100)); // wait 100ms, total 200ms
    rerender({ value: "fourth" }); // new value with rerender
    expect(result.current).toBe("first"); // Still 'first' before debounce and after approx 200ms
    await waitFor(() => expect(result.current).toBe("fourth"), {
      timeout: 500,
    }); // Should only update to 'fourth' after debounce
  });
});
