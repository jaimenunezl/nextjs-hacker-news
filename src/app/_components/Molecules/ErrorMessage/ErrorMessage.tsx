type ErrorProps = {
  error?: Error;
  defaultErrorMessage: string;
};

function ErrorMessage({ error, defaultErrorMessage }: ErrorProps) {
  return (
    <div className="w-full flex justify-center items-center">
      <p className={'text-rose-500'}>{error?.message || defaultErrorMessage}</p>
    </div>
  );
}

export default ErrorMessage;
