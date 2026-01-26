import { Button } from "@/components/ui/button";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { RotateCcw } from "lucide-react";
import { ResetAlert } from "../alert/reset-alert";

interface IFormCardHeaderWithResetProps {
  title: string;
  onResetConfirm?: () => void;
  description?: string;
  showResetButton?: boolean;
  resetTooltipText?: string;
}

const FormCardHeaderWithReset = ({
  title,
  onResetConfirm,
  description = "This form auto-saves as a draft to prevent data loss from accidental refresh or closure.",
  showResetButton = true,
  resetTooltipText = "Reset the form",
}: IFormCardHeaderWithResetProps) => {
  return (
    <CardHeader className="-space-y-1">
      <div className="flex flex-row justify-between items-center">
        <CardTitle className="text-xl">{title}</CardTitle>

        {showResetButton && (
          <div className="cursor-pointer">
            <ResetAlert onConfirm={onResetConfirm || (() => {})}>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full h-9 w-9 transition-all hover:bg-muted hover:scale-105"
              >
                <RotateCcw className="w-4 h-4" />
              </Button>
            </ResetAlert>
          </div>
        )}
      </div>

      {description && (
        <CardDescription className="">{description}</CardDescription>
      )}
    </CardHeader>
  );
};

export default FormCardHeaderWithReset;
