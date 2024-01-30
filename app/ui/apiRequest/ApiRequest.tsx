import React, { useMemo } from "react";

interface QueryParameters {
  name: string;
  type: string;
  description: React.ReactNode;
}

interface Props {
  method: string;
  url: React.ReactNode;
  parameters?: QueryParameters[];
  children?: React.ReactNode;
}

export default function ApiRequest({
  children,
  method,
  parameters = [],
  url,
}: Props) {
  const parameterElements = useMemo(() => {
    return parameters.map((parameter) => (
      <>
        <div className="font-mono">{parameter.name}</div>
        <div>{parameter.type}</div>
        <div className="col-span-4">{parameter.description}</div>
      </>
    ));
  }, [parameters]);

  return (
    <div className="flex flex-col mb-16">
      <div className="flex flex-row items-center">
        <div className="p-2 mr-4 bg-profiq-green font-bold rounded">
          {method}
        </div>
        <div>{url}</div>
      </div>
      {children && <div className="mt-4">{children}</div>}
      {parameterElements.length > 0 && (
        <div className="flex flex-col mt-4">
          <span className="font-bold mb-2">Query parameters</span>
          <div className="grid grid-cols-6 gap-y-1">{parameterElements}</div>
        </div>
      )}
    </div>
  );
}
