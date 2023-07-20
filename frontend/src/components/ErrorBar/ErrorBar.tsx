import React from 'react';
import { MessageBar, MessageBarType } from '@fluentui/react';

interface ErrorBarProps {
  message: string;
  messageType: 'error' | 'warning' | 'info';
}

const ErrorBar: React.FC<ErrorBarProps> = ({ message, messageType }) => {
  let barType: MessageBarType = MessageBarType.error;

  if (messageType === 'warning') {
    barType = MessageBarType.warning;
  } else if (messageType === 'info') {
    barType = MessageBarType.info;
  }

  return (
    <MessageBar messageBarType={barType}>
      {message}
    </MessageBar>
  );
};

export default ErrorBar;
