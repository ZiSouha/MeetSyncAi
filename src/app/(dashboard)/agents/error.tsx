"use client"
import { ErrorState } from '@/components/error-state'
import React from 'react'

const ErrorPage = () => {
  return (
    <ErrorState
        title='Error Loading Agents'
        description='Something went wrong'
    />
  );
};

export default ErrorPage
