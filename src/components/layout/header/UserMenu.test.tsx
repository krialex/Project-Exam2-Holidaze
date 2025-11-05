import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, vi, expect } from "vitest";
import { UserMenu } from "./UserMenu";
import { useUser } from "./../../../context/UserContext";
import { BrowserRouter } from "react-router-dom";
import type { Mock } from 'vitest';

vi.mock("./../../../context/UserContext.tsx");

describe("UserMenu", () => {
  const mockUseUser = useUser as unknown as Mock;
  const openLogin = vi.fn();
  const openRegister = vi.fn();
  const setUser = vi.fn();
  const refreshUser = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows Log in and Register when no one is loged in", () => {
    mockUseUser.mockReturnValue({ user: null, setUser, refreshUser });

    render(
      <BrowserRouter>
        <UserMenu openLogin={openLogin} openRegister={openRegister} />
      </BrowserRouter>
    );

    expect(screen.getByText(/log in/i)).toBeInTheDocument();
    expect(screen.getByText(/register/i)).toBeInTheDocument();

    fireEvent.click(screen.getByText(/log in/i));
    expect(openLogin).toHaveBeenCalled();

    fireEvent.click(screen.getByText(/register/i));
    expect(openRegister).toHaveBeenCalled();
  });

  it("shows Log out and profile icon when user is loged in", () => {
    mockUseUser.mockReturnValue({ user: { name: "Test" }, setUser, refreshUser });

    render(
      <BrowserRouter>
        <UserMenu openLogin={openLogin} openRegister={openRegister} />
      </BrowserRouter>
    );

    expect(screen.getByText(/log out/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /user profile/i })).toBeInTheDocument();
  });
});