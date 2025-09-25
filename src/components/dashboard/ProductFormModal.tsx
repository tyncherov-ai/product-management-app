import React, { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import { useAppDispatch } from "../../hooks/redux";
import { createProduct, updateProduct } from "../../store/slices/productsSlice";
import type {
  CreateProductRequest,
  Product,
  UpdateProductRequest,
} from "../../types";
import { STATUS } from "../../utils/consts";

interface ProductFormData {
  name: string;
  price: number;
  category: string;
  stock: number;
}

interface ProductFormModalProps {
  open: boolean;
  onClose: () => void;
  productToEdit: Product | null;
}

const ProductFormModal: React.FC<ProductFormModalProps> = ({
  open,
  onClose,
  productToEdit,
}) => {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ProductFormData>();

  const isEditMode = !!productToEdit;

  useEffect(() => {
    if (isEditMode) {
      reset({
        name: productToEdit.name,
        price: productToEdit.data?.price || 0,
        category: productToEdit.data?.category || "",
        stock: productToEdit.data?.stock || 0,
      });
    } else {
      reset({
        name: "",
        price: 0,
        category: "",
        stock: 0,
      });
    }
  }, [productToEdit, reset, isEditMode, open]);

  const handleClose = () => {
    onClose();
  };

  const onSubmit: SubmitHandler<ProductFormData> = async (formData) => {
    const commonData = {
      price: Number(formData.price),
      category: formData.category,
      stock: Number(formData.stock),
      status: Number(formData.stock) > 0 ? STATUS.ACTIVE : STATUS.OUT_OF_STOCK,
    };

    try {
      if (isEditMode) {
        const updateData: UpdateProductRequest = {
          id: productToEdit.id,
          name: formData.name,
          data: commonData,
        };
        await dispatch(updateProduct(updateData)).unwrap();
      } else {
        const createData: CreateProductRequest = {
          name: formData.name,
          data: commonData,
        };
        await dispatch(createProduct(createData)).unwrap();
      }
      handleClose();
    } catch (error) {
      console.error("Failed to save product:", error);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>
        {isEditMode ? "Edit Product" : "Add New Product"}
      </DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Product Name"
            type="text"
            fullWidth
            variant="outlined"
            {...register("name", { required: "Product name is required" })}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
          <TextField
            margin="dense"
            label="Category"
            type="text"
            fullWidth
            variant="outlined"
            {...register("category", { required: "Category is required" })}
            error={!!errors.category}
            helperText={errors.category?.message}
          />
          <TextField
            margin="dense"
            label="Price"
            type="number"
            fullWidth
            variant="outlined"
            {...register("price", {
              required: "Price is required",
              valueAsNumber: true,
              min: { value: 0, message: "Price cannot be negative" },
            })}
            error={!!errors.price}
            helperText={errors.price?.message}
          />
          <TextField
            margin="dense"
            label="Stock"
            type="number"
            fullWidth
            variant="outlined"
            {...register("stock", {
              required: "Stock is required",
              valueAsNumber: true,
              min: { value: 0, message: "Stock cannot be negative" },
            })}
            error={!!errors.stock}
            helperText={errors.stock?.message}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" variant="contained" disabled={isSubmitting}>
            {isSubmitting ? (
              <CircularProgress size={24} />
            ) : isEditMode ? (
              "Save Changes"
            ) : (
              "Create"
            )}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ProductFormModal;
