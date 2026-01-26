import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export function WaitingListAlert({
  open,
  setOpen,
  onChooseAnother,
  onAddToWaitingList,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  onChooseAnother: () => void;
  onAddToWaitingList: () => void;
}) {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Staff capacity reached</AlertDialogTitle>
          <AlertDialogDescription>
            The selected staff member has reached their daily capacity. Please
            choose another staff member or add this appointment to the waiting
            list.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() => {
              onChooseAnother();
              setOpen(false);
            }}
          >
            Choose another staff
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={() => {
              onAddToWaitingList();
              setOpen(false);
            }}
          >
            Add to waiting list
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
