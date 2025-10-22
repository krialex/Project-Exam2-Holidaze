import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, vi, expect } from "vitest";
import { UserMenu } from "./../../src/components/layout/header/UserMenu";
import { useUser } from "./../../src/context/UserContext";
import { BrowserRouter } from "react-router-dom";
import type { Mock } from 'vitest';

vi.mock("./../../src/context/UserContext");

describe("UserMenu", () => {
  const mockUseUser = useUser as unknown as Mock;
  const openLogin = vi.fn();
  const openRegister = vi.fn();
  const setUser = vi.fn();
  const refreshUser = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("viser Log in og Register når ingen er logget inn", () => {
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

  it("viser Log out og profil-knapp når bruker er logget inn", () => {
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