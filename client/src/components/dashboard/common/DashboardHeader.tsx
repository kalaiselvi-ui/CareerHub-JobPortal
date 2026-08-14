import React from "react";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";

interface DashboardHeaderProps {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
  onButtonClick?: () => void;
  showButton?: boolean; // Controls whether to render the action button
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  title,
  description,
  buttonText,
  buttonLink,
  onButtonClick,
  showButton = true,
}) => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    if (onButtonClick) {
      onButtonClick();
    } else if (buttonLink) {
      navigate(buttonLink);
    }
  };

  const shouldRenderButton =
    showButton && buttonText && (buttonLink || onButtonClick);
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pb-6 border-b border-gray-200">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          {title}
        </h1>
        <p className="mt-1 text-sm text-gray-500">{description}</p>
      </div>

      {shouldRenderButton && (
        <button
          onClick={handleButtonClick}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer self-start sm:self-auto"
        >
          <Plus className="h-4 w-4" />
          <span>{buttonText}</span>
        </button>
      )}
    </div>
  );
};

export default DashboardHeader;
