/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"

//Home Page Component
import HomePage from "@/pages/index"

vi.mock("framer-motion", () => ({
    motion: {
        div: ({ children }: any) => <div>{children}</div>,
        h1: ({ children }: any) => <h1>{children}</h1>,
        p: ({ children }: any) => <p>{children}</p>,
    },
}))

//Scaffold renderWithRouter() helper to avoid repeating <MemoryRouter>
const renderWithRouter = (ui: React.ReactNode) => {
    return render(<MemoryRouter>{ui}</MemoryRouter>)
}

describe("HomePage", () => {
    it("renders main heading and CTA button", () => {
        renderWithRouter(<HomePage />)

        expect(screen.getByText(/Share the Gift of Choice/i)).toBeInTheDocument()

        const ctaLink = screen.getByRole("link", { name: /Gift a Voucher/i })
        expect(ctaLink).toBeInTheDocument()
        expect(ctaLink).toHaveAttribute("href", "/gift")
    })

    it("renders all features", () => {
        renderWithRouter(<HomePage />)

        expect(screen.getByText(/Instant Delivery/i)).toBeInTheDocument()
        expect(screen.getByText(/Fully Customizable/i)).toBeInTheDocument()
        expect(screen.getByText(/Secure & Reliable/i)).toBeInTheDocument()
    })
})
