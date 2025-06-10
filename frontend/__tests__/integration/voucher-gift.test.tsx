/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

//Gift Voucher Form
import VoucherGiftForm from "../../src/pages/voucher-gift/Form"

// Mock framer-motion to avoid animation issues in tests
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    p: ({ children }: any) => <p>{children}</p>,
  },
  AnimatePresence: ({ children }: any) => children,
}))


describe("VoucherGiftForm", () => {

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
})