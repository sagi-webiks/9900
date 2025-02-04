import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button, TextField, Box } from "@mui/material";
import Dialog from "@/components/layout/Dialog";
import { GeometryTypeHebrewMapper, InteractionMode } from "@/types";
import { useDialog } from "@/hooks/useDialog";
import OpenLayersMap, { type OpenLayersMapProps } from "@/components/common/OpenLayersMap";
import { useEffect, useMemo, useRef } from "react";
import type { Geometry } from "ol/geom";
import { Feature } from "ol";
import { useMapFeatures } from "@/pages/MapPage/useMapFeatures";
import { useCreateTodo, useUpdateTodo } from "@/hooks/useTodos";
import { toast } from "react-toastify";

const schema = z.object({
  name: z.string().min(1, "שם הוא שדה חובה"),
  priority: z.union([z.number({ invalid_type_error: "עדיפות חייבת להיות מספר" }), z.null()]),
});

type FormData = z.infer<typeof schema>;

export default function FeatureDialog() {
  const { closeDialog, dialogState } = useDialog();
  const { features } = useMapFeatures();
  const featuresRef = useRef<Feature[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", priority: null },
    mode: "onChange",
  });

  const { mutate: createTodo } = useCreateTodo(
    () => toast.success("נוצר בהצלחה"),
    () => toast.error("אירעה שגיאה ביצירה")
  );
  const { mutate: updateTodo } = useUpdateTodo(
    () => toast.success("עודכן בהצלחה"),
    () => toast.error("אירעה שגיאה בעדכון")
  );

  useEffect(() => {
    featuresRef.current = features;
  }, [features]);

  useEffect(() => {
    featuresRef.current = [];
    if (dialogState.data) {
      const feature = dialogState.data as Feature<Geometry>;
      featuresRef.current = [feature];
      const properties = feature.getProperties();
      setValue("name", properties.name || "", { shouldValidate: true });
      setValue("priority", properties.priority ?? null, { shouldValidate: true });
    }
  }, [dialogState.data, setValue]);

  function handleClose() {
    featuresRef.current = [];
    reset({ name: "", priority: null });
    closeDialog();
  }

  function isFormInvalid(): boolean {
    const features = featuresRef.current;
    const hasFeatures = features.length > 0;
    const hasValidGeometry = features[0]?.getGeometry()?.getType() !== undefined;

    return !isValid || !hasFeatures || !hasValidGeometry;
  }

  function submitForm(): void {
    if (isFormInvalid()) {
      toast.error("נא לבחור מיקום על המפה");
      return;
    }

    const feature = featuresRef.current[0];
    if (!feature) {
      return;
    }

    if (dialogState.mode === InteractionMode.Create) {
      createTodo(feature);
    } else if (dialogState.mode === InteractionMode.Edit) {
      const todoId = feature.getId() as string;
      updateTodo({ id: todoId, updatedTodo: feature });
    }

    handleClose();
  }

  function handleFieldChange(field: string, value: unknown) {
    if (featuresRef.current?.[0]) {
      featuresRef.current[0].set(field, value);
    } else {
      const feature = new Feature({ [field]: value });
      featuresRef.current = [feature];
    }
  }

  const dialogTitle =
    dialogState.mode === InteractionMode.View
      ? `מיקום ${GeometryTypeHebrewMapper[dialogState.dialogName as keyof typeof GeometryTypeHebrewMapper] || ""}`
      : dialogState.mode === InteractionMode.Edit
        ? `עריכת ${GeometryTypeHebrewMapper[dialogState.dialogName as keyof typeof GeometryTypeHebrewMapper] || ""}`
        : dialogState.mode === InteractionMode.Create
          ? `יצירת ${GeometryTypeHebrewMapper[dialogState.dialogName as keyof typeof GeometryTypeHebrewMapper] || ""}`
          : "";

  const mapProps: OpenLayersMapProps = useMemo(
    () => ({
      center: [34.9, 31.5],
      zoom: 8.5,
      featuresRef,
      mode: dialogState.mode,
    }),
    [dialogState.mode]
  );

  return (
    <Dialog open={dialogState.open} handleClose={handleClose} height={600}>
      <Dialog.Title>{dialogTitle}</Dialog.Title>
      <Dialog.Content>
        <Box display="flex" flexDirection="column" gap={2}>
          {dialogState.mode !== InteractionMode.View && (
            <>
              <TextField
                label="שם"
                placeholder="הזן שם"
                fullWidth
                margin="normal"
                {...register("name")}
                error={!!errors.name}
                helperText={errors.name?.message}
                onChange={(e) => {
                  const value = e.target.value;
                  setValue("name", value, { shouldValidate: true });
                  handleFieldChange("name", value);
                }}
              />
              <TextField
                label="עדיפות"
                placeholder="הזן עדיפות"
                fullWidth
                margin="normal"
                type="number"
                {...register("priority", { valueAsNumber: true })}
                error={!!errors.priority}
                helperText={errors.priority?.message}
                onChange={(e) => {
                  const priority = e.target.value ? Number(e.target.value) : null;
                  setValue("priority", priority, { shouldValidate: true });
                  handleFieldChange("priority", priority);
                }}
              />
            </>
          )}

          <Box position="relative" width="100%" height={450}>
            <OpenLayersMap {...mapProps} />
          </Box>
        </Box>
      </Dialog.Content>
      {dialogState.mode !== InteractionMode.View && (
        <Dialog.Actions>
          <Button fullWidth onClick={handleSubmit(submitForm)} color="primary" variant="contained">
            שמור
          </Button>
        </Dialog.Actions>
      )}
    </Dialog>
  );
}
