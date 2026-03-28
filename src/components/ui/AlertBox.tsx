import { cn } from "@/lib/utils";
import { Info, AlertTriangle, CheckCircle2, XCircle, Lightbulb } from "lucide-react";

type AlertType = "info" | "warning" | "success" | "danger" | "tip";

interface AlertBoxProps {
  type?: AlertType;
  title?: string;
  children: React.ReactNode;
}

const config: Record<AlertType, { icon: React.ReactNode; classes: string; titleClass: string }> = {
  info: {
    icon: <Info className="w-4 h-4 shrink-0 mt-0.5" />,
    classes: "bg-blue-50 border-blue-200 text-blue-900 dark:bg-blue-950/30 dark:border-blue-800 dark:text-blue-200",
    titleClass: "text-blue-800 dark:text-blue-300",
  },
  warning: {
    icon: <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />,
    classes: "bg-amber-50 border-amber-200 text-amber-900 dark:bg-amber-950/30 dark:border-amber-800 dark:text-amber-200",
    titleClass: "text-amber-800 dark:text-amber-300",
  },
  success: {
    icon: <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />,
    classes: "bg-green-50 border-green-200 text-green-900 dark:bg-green-950/30 dark:border-green-800 dark:text-green-200",
    titleClass: "text-green-800 dark:text-green-300",
  },
  danger: {
    icon: <XCircle className="w-4 h-4 shrink-0 mt-0.5" />,
    classes: "bg-red-50 border-red-200 text-red-900 dark:bg-red-950/30 dark:border-red-800 dark:text-red-200",
    titleClass: "text-red-800 dark:text-red-300",
  },
  tip: {
    icon: <Lightbulb className="w-4 h-4 shrink-0 mt-0.5" />,
    classes: "bg-purple-50 border-purple-200 text-purple-900 dark:bg-purple-950/30 dark:border-purple-800 dark:text-purple-200",
    titleClass: "text-purple-800 dark:text-purple-300",
  },
};

export function AlertBox({ type = "info", title, children }: AlertBoxProps) {
  const c = config[type];
  return (
    <div className={cn("flex gap-3 border rounded-lg p-4 mb-5 not-prose text-sm", c.classes)}>
      {c.icon}
      <div className="flex-1 min-w-0">
        {title && <div className={cn("font-semibold mb-1", c.titleClass)}>{title}</div>}
        <div className="leading-relaxed">{children}</div>
      </div>
    </div>
  );
}
