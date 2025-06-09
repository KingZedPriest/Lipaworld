/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useMutation } from "@tanstack/react-query";

//Gift Voucher Form
import VoucherGiftForm from "../src/pages/voucher-gift/Form"

// Mock TanStack Query's useMutation
vi.mock("@tanstack/react-query", async () => {
  const actual = await vi.importActual<any>("@tanstack/react-query")
  return {
    ...actual,
    useMutation: vi.fn(),
  }
})

// Mock framer-motion to avoid animation issues in tests
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: any) => children,
}))


describe("VoucherGiftForm", () => {
  const mockMutateAsync = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()

    vi.mocked(useMutation).mockReturnValue({
      mutateAsync: mockMutateAsync,
      isLoading: false,
      isSuccess: false,
      isError: false,
      error: null,
      data: undefined,
      mutate: vi.fn(),
      reset: vi.fn(),
      status: "idle",
    })
  })

  it("renders the form with all required fields", () => {
    render(<VoucherGiftForm />)

    expect(screen.getByText("Gift a Voucher")).toBeInTheDocument()
    expect(screen.getByLabelText(/email or wallet address/i)).toBeInTheDocument()
    expect(screen.getByText("Amount")).toBeInTheDocument()
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /send voucher/i })).toBeInTheDocument()
  })

  it("validates email format correctly", async () => {
    const user = userEvent.setup()
    render(<VoucherGiftForm />)

    const recipientInput = screen.getByLabelText(/email or wallet address/i)
    await user.type(recipientInput, "invalid-email")

    const submitButton = screen.getByRole("button", { name: /send voucher/i })
    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/must be a valid email address or wallet address/i)).toBeInTheDocument()
    })
  })

  it("validates wallet address format correctly", async () => {
    const user = userEvent.setup()
    render(<VoucherGiftForm />)

    const recipientInput = screen.getByLabelText(/email or wallet address/i)
    await user.type(recipientInput, "0x1234567890123456789012345678901234567890")

    const submitButton = screen.getByRole("button", { name: /send voucher/i })
    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.queryByText(/must be a valid email address or wallet address/i)).not.toBeInTheDocument()
    })
  })

  it("shows custom amount input when custom is selected", async () => {
    const user = userEvent.setup()
    render(<VoucherGiftForm />)

    const amountSelect = screen.getByRole("combobox")
    await user.click(amountSelect)
    const customOption = screen.getByText("Custom Amount")
    await user.click(customOption)

    await waitFor(() => {
      expect(screen.getByLabelText(/custom amount/i)).toBeInTheDocument()
    })
  })

  it("validates custom amount when selected", async () => {
    const user = userEvent.setup()
    render(<VoucherGiftForm />)

    const amountSelect = screen.getByRole("combobox")
    await user.click(amountSelect)
    const customOption = screen.getByText("Custom Amount")
    await user.click(customOption)

    const submitButton = screen.getByRole("button", { name: /send voucher/i })
    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/custom amount is required/i)).toBeInTheDocument()
    })
  })

  it("validates custom amount is positive", async () => {
    const user = userEvent.setup()
    render(<VoucherGiftForm />)

    const amountSelect = screen.getByRole("combobox")
    await user.click(amountSelect)
    const customOption = screen.getByText("Custom Amount")
    await user.click(customOption)

    const customAmountInput = screen.getByLabelText(/custom amount/i)
    await user.type(customAmountInput, "-10")

    const submitButton = screen.getByRole("button", { name: /send voucher/i })
    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/custom amount must be a positive number/i)).toBeInTheDocument()
    })
  })

  it("validates custom amount does not exceed maximum", async () => {
    const user = userEvent.setup()
    render(<VoucherGiftForm />)

    const amountSelect = screen.getByRole("combobox")
    await user.click(amountSelect)
    const customOption = screen.getByText("Custom Amount")
    await user.click(customOption)

    const customAmountInput = screen.getByLabelText(/custom amount/i)
    await user.type(customAmountInput, "15000")

    const submitButton = screen.getByRole("button", { name: /send voucher/i })
    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/custom amount cannot exceed \$10,000/i)).toBeInTheDocument()
    })
  })

  it("validates message length", async () => {
    const user = userEvent.setup()
    render(<VoucherGiftForm />)

    const messageInput = screen.getByLabelText(/message/i)
    const longMessage = "a".repeat(501)
    await user.type(messageInput, longMessage)

    const submitButton = screen.getByRole("button", { name: /send voucher/i })
    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/message cannot exceed 500 characters/i)).toBeInTheDocument()
    })
  })

  it("submits form with valid data", async () => {
    const user = userEvent.setup()
    mockMutateAsync.mockResolvedValueOnce(undefined)

    render(<VoucherGiftForm />)

    const recipientInput = screen.getByLabelText(/email or wallet address/i)
    await user.type(recipientInput, "test@example.com")

    const amountSelect = screen.getByRole("combobox")
    await user.click(amountSelect)
    const amountOption = screen.getByText("$50")
    await user.click(amountOption)

    const messageInput = screen.getByLabelText(/message/i)
    await user.type(messageInput, "Happy birthday!")

    const submitButton = screen.getByRole("button", { name: /send voucher/i })
    await user.click(submitButton)

    await waitFor(() => {
      expect(mockMutateAsync).toHaveBeenCalledWith({
        recipient: "test@example.com",
        amount: "50",
        customAmount: "",
        message: "Happy birthday!",
      })
    })
  })

  it("shows success message after successful submission", async () => {
    const user = userEvent.setup()
    mockMutateAsync.mockResolvedValueOnce(undefined)

    render(<VoucherGiftForm />)

    const recipientInput = screen.getByLabelText(/email or wallet address/i)
    await user.type(recipientInput, "test@example.com")

    const amountSelect = screen.getByRole("combobox")
    await user.click(amountSelect)
    const amountOption = screen.getByText("$25")
    await user.click(amountOption)

    const submitButton = screen.getByRole("button", { name: /send voucher/i })
    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/voucher sent successfully! 🎉/i)).toBeInTheDocument()
    })
  })

  it("shows error message when submission fails", async () => {
    const user = userEvent.setup()
    mockMutateAsync.mockRejectedValueOnce(new Error("API Error"))

    render(<VoucherGiftForm />)

    const recipientInput = screen.getByLabelText(/email or wallet address/i)
    await user.type(recipientInput, "test@example.com")

    const amountSelect = screen.getByRole("combobox")
    await user.click(amountSelect)
    const amountOption = screen.getByText("$25")
    await user.click(amountOption)

    const submitButton = screen.getByRole("button", { name: /send voucher/i })
    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/failed to send voucher, please try again\./i)).toBeInTheDocument()
    })
  })

  it("disables submit button while submitting", async () => {
    const user = userEvent.setup()
    mockMutateAsync.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 1000)))

    render(<VoucherGiftForm />)

    const recipientInput = screen.getByLabelText(/email or wallet address/i)
    await user.type(recipientInput, "test@example.com")

    const amountSelect = screen.getByRole("combobox")
    await user.click(amountSelect)
    const amountOption = screen.getByText("$25")
    await user.click(amountOption)

    const submitButton = screen.getByRole("button", { name: /send voucher/i })
    await user.click(submitButton)

    expect(submitButton).toBeDisabled()
    expect(screen.getByText(/sending/i)).toBeInTheDocument()
  })
})
