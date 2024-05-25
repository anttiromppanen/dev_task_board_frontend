import { AxiosError } from "axios";
import { Dispatch, SetStateAction, useEffect } from "react";
import { printAxiosErrorText } from "../helpers/notificationHelpers";

type VariantType = "success" | "error" | "info";

interface NotificationFactoryProps {
  text: string;
  setShowNotification: Dispatch<SetStateAction<boolean>>;
  setNotificationText: Dispatch<SetStateAction<string>>;
  variant?: VariantType;
}

function NotificationFactory({
  text,
  setShowNotification,
  setNotificationText,
  variant = "info",
}: NotificationFactoryProps) {
  const notificationVariantStyles: Record<VariantType, string> = {
    info: "bg-userLightGrey",
    success: "bg-userLightGreen",
    error: "bg-userPink",
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowNotification(false);
      setNotificationText("");
    }, 5000);

    // Cleanup the timeout if the component unmounts before the timeout completes
    return () => clearTimeout(timeoutId);
  }, [setShowNotification, setNotificationText]);

  return (
    <div
      className={`my-2 flex-[0_0_100%] rounded-md p-2 text-center font-semibold ${notificationVariantStyles[variant]}`}
    >
      {text}
    </div>
  );
}

export function SuccessNotification({
  text,
  setShowNotification,
  setNotificationText,
}: Exclude<NotificationFactoryProps, "variant">) {
  return (
    <NotificationFactory
      text={text}
      setShowNotification={setShowNotification}
      setNotificationText={setNotificationText}
      variant="success"
    />
  );
}

export function ErrorNotification({
  text,
  setShowNotification,
  setNotificationText,
}: Exclude<NotificationFactoryProps, "variant">) {
  return (
    <NotificationFactory
      text={text}
      setShowNotification={setShowNotification}
      setNotificationText={setNotificationText}
      variant="error"
    />
  );
}

interface IRequestResponseNotification
  extends Omit<NotificationFactoryProps, "variant" | "text"> {
  isError: boolean;
  showNotification: boolean;
  successNotification: string;
  error: unknown;
}

export function RequestResponseNotification({
  setShowNotification,
  setNotificationText,
  isError,
  showNotification,
  successNotification,
  error,
}: IRequestResponseNotification) {
  if (isError && !(error instanceof AxiosError))
    return <div>Invalid error format: AxiosError required</div>;

  return (
    <>
      {isError && showNotification && (
        <ErrorNotification
          text={`Error: ${printAxiosErrorText(error as AxiosError)}`}
          setNotificationText={setNotificationText}
          setShowNotification={setShowNotification}
        />
      )}
      {!isError && showNotification && (
        <SuccessNotification
          text={successNotification}
          setShowNotification={setShowNotification}
          setNotificationText={setNotificationText}
        />
      )}
    </>
  );
}

export default Notification;
