import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type {
  CreateProductRequest,
  Product,
  UpdateProductRequest,
} from "../../types";
import { api } from "../../api/axiosInstance";
import type { AxiosError } from "axios";

interface ProductsState {
  items: Product[];
  item: Product | null;
  loadingList: boolean;
  loadingItem: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  items: [],
  item: null,
  loadingList: false,
  loadingItem: false,
  error: null,
};

const fetchProducts = createAsyncThunk<Product[]>(
  "products/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get<Product[]>("");
      return data;
    } catch (err) {
      const error = err as AxiosError<{ error: string }>;
      return rejectWithValue(
        error.response?.data.error ?? "Failed to load products"
      );
    }
  }
);

const fetchProductById = createAsyncThunk<
  Product,
  string,
  { rejectValue: string }
>("products/fetchById", async (id, { rejectWithValue }) => {
  try {
    const { data } = await api.get<Product>(`/${id}`);
    return data;
  } catch (err) {
    const error = err as AxiosError<{ error: string }>;
    return rejectWithValue(
      error.response?.data.error ?? "Failed to load product"
    );
  }
});

const createProduct = createAsyncThunk<
  Product,
  CreateProductRequest,
  { rejectValue: string }
>("products/create", async (body, { rejectWithValue }) => {
  try {
    const { data } = await api.post<Product>("", body);
    return data;
  } catch (err) {
    const error = err as AxiosError<{ error: string }>;
    return rejectWithValue(
      error.response?.data.error ?? "Failed to create product"
    );
  }
});

const updateProduct = createAsyncThunk<
  Product,
  UpdateProductRequest,
  { rejectValue: string }
>("products/update", async ({ id, ...body }, { rejectWithValue }) => {
  try {
    const { data } = await api.put<Product>(`/${id}`, body);
    return data;
  } catch (err) {
    const error = err as AxiosError<{ error: string }>;
    return rejectWithValue(
      error.response?.data.error ?? "Failed to update product"
    );
  }
});

const deleteProduct = createAsyncThunk<string, string, { rejectValue: string }>(
  "products/delete",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/${id}`);
      return id;
    } catch (err) {
      const error = err as AxiosError<{ error: string }>;
      return rejectWithValue(
        error.response?.data.error ?? "An unknown server error occurred"
      );
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetch all
      .addCase(fetchProducts.pending, (state) => {
        state.loadingList = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loadingList = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loadingList = false;
        state.error = action.error.message ?? "Failed to load products";
      })
      // fetch by id
      .addCase(fetchProductById.pending, (state) => {
        state.loadingItem = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loadingItem = false;
        state.item = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loadingItem = false;
        state.error = action.payload ?? "Failed to load product";
      })
      // create
      .addCase(createProduct.pending, (state) => {
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.error = action.payload ?? "Failed to create product";
      })
      // update
      .addCase(updateProduct.pending, (state) => {
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const idx = state.items.findIndex((p) => p.id === action.payload.id);
        if (idx >= 0) state.items[idx] = action.payload;
        if (state.item?.id === action.payload.id) state.item = action.payload;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        console.log(action.error);
        state.error = action.payload ?? "Failed to update product";
      })
      // delete
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.items = state.items.filter((p) => p.id !== action.payload);
        if (state.item?.id === action.payload) state.item = null;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.error = action.payload ?? "Failed to delete product";
      });
  },
});

export {
  fetchProducts,
  fetchProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
export default productsSlice.reducer;
