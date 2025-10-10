import React, { ReactNode } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { UseProvider } from './../src/context/UserContext'

const AllProviders = ({ children }: { children?: ReactNode }) => (
  <MemoryRouter initialEntries={['/']}>
    <UseProvider>{children}</UseProvider>
  </MemoryRouter>
)

const customRender = (
  ui: React.ReactElement,
  options?: RenderOptions & { wrapper?: React.ComponentType<{ children?: ReactNode }> }
) => render(ui, { wrapper: options?.wrapper || AllProviders, ...options })

export * from '@testing-library/react'
export { customRender as render }



