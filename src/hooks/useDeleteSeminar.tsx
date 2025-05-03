import { useCallback } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const useDeleteSeminar = () => {
  const deleteSeminar = useCallback(
    async (id: string, onSuccess?: () => void) => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          toast.error("Missing token. Please log in again.");
          return;
        }

        await axios.delete(`https://backend-e-waste-management.vercel.app/api/seminars/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        toast.success("Seminar deleted successfully.");
        if (onSuccess) onSuccess();
      } catch (err: any) {
        toast.error("Failed to delete seminar. Please try again.");
        console.error("Delete error:", err);
      }
    },
    []
  );

  return { deleteSeminar };
};
