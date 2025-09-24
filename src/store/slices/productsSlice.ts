import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type {
  CreateProductRequest,
  Product,
  UpdateProductRequest,
} from "../../types";
import axios from "axios";

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

const BASE_URL = "https://api.restful-api.dev/objects";

const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

const fetchProducts = createAsyncThunk<Product[]>(
  "products/fetchAll",
  async () => {
    const { data } = await api.get<Product[]>("");
    return data;
  }
);

const fetchProductById = createAsyncThunk<Product, string>(
  "products/fetchById",
  async (id: string) => {
    const { data } = await api.get<Product>(`/${id}`);
    return data;
  }
);

const createProduct = createAsyncThunk<Product, CreateProductRequest>(
  "products/create",
  async (body) => {
    const { data } = await api.post<Product>("", body);
    return data;
  }
);

const updateProduct = createAsyncThunk<Product, UpdateProductRequest>(
  "products/update",
  async ({ id, ...body }) => {
    const { data } = await api.put<Product>(`/${id}`, body);
    return data;
  }
);

const deleteProduct = createAsyncThunk<string, string>(
  "products/delete",
  async (id: string) => {
    await api.delete(`/${id}`);
    return id;
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
        state.error = action.error.message ?? "Failed to load product";
      })
      // create
      .addCase(createProduct.pending, (state) => {
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.error = action.error.message ?? "Failed to create product";
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
        state.error = action.error.message ?? "Failed to update product";
      })
      // delete
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.items = state.items.filter((p) => p.id !== action.payload);
        if (state.item?.id === action.payload) state.item = null;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.error = action.error.message ?? "Failed to delete product";
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
