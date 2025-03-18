"use client";

import React from "react";

interface Props {
  serviceName: string;
  serviceId: string;
}

function StoresDetailClient({ serviceName, serviceId }: Props) {
  return (
    <div>
      <h1>Service Name: {serviceName}</h1>
      <h2>Service ID: {serviceId}</h2>
    </div>
  );
}

export default StoresDetailClient;
