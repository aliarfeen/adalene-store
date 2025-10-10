// filtersSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export type FiltersState = {
  category: string
  priceRange: [number, number]
  colors: string[]
  search: string
}

const initialState: FiltersState = {
  category: "",
  priceRange: [0, 1000],
  colors: [],
  search: ""
}

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload
    },
    setPriceRange: (state, action: PayloadAction<[number, number]>) => {
      state.priceRange = action.payload
    },
    setColors: (state, action: PayloadAction<string[]>) => {
      state.colors = action.payload
    },
    toggleColor: (state, action: PayloadAction<string>) => {
      const color = action.payload
      if (state.colors.includes(color))
        state.colors = state.colors.filter(c => c !== color)
      else state.colors.push(color)
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload
    },
    resetFilters: () => initialState
  }
})

export const { setCategory, setPriceRange, setColors, toggleColor, setSearch, resetFilters } =
  filtersSlice.actions

export default filtersSlice.reducer
