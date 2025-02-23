import { Virtualizer } from '@tanstack/react-virtual';
import { Alert, Box, Button, styled } from '@ui';
import React, { useEffect } from 'react';

type Props = {
  recordIndex?: number;
  isScrollAuto?: boolean;
  hideAfter?: number;
  rowVirtualizer: Virtualizer<HTMLDivElement, HTMLTableRowElement> | null;
};

export default function ScrollToRecord({ recordIndex, isScrollAuto, rowVirtualizer, hideAfter = 5000 }: Props) {
  const [scrollToIndex, setScrollToIndex] = React.useState<number | undefined>(undefined);
  const [isShowNotification, setIsShowNotification] = React.useState(false);

  useEffect(() => {
    if (scrollToIndex !== recordIndex && !isScrollAuto) {
      setScrollToIndex(recordIndex);
      setIsShowNotification(true);
    } else if (isScrollAuto && recordIndex !== undefined) {
      requestAnimationFrame(() => {
        rowVirtualizer?.scrollToIndex(recordIndex, { align: 'center' });
      });
    }
  }, [isScrollAuto, recordIndex, rowVirtualizer, scrollToIndex]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isShowNotification && hideAfter > 0) {
      timer = setTimeout(() => {
        setIsShowNotification(false);
      }, hideAfter);
    }
    return () => clearTimeout(timer);
  }, [isShowNotification, hideAfter]);

  const handleOnClick = () => {
    if (scrollToIndex) {
      rowVirtualizer?.scrollToIndex(scrollToIndex, { align: 'center' });
      setIsShowNotification(false);
    }
  };

  return isShowNotification ? (
    <AlertContainer>
      <Alert
        severity="success"
        action={
          <Button variant="outlined" size="small" onClick={handleOnClick}>
            Go to record
          </Button>
        }
      >
        Record Added
      </Alert>
    </AlertContainer>
  ) : null;
}

const AlertContainer = styled(Box)`
  position: sticky;
  bottom: ${({ theme }) => theme.spacing(2)};
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;

  .MuiAlert-root {
    align-items: center;
  }

  .MuiAlert-action {
    padding-top: 0;
  }
`;
