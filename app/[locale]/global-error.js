'use client';

import { Button, Result } from 'antd';
import { RedoOutlined } from '@ant-design/icons';
import { Outfit } from 'next/font/google';

const outfit = Outfit({
  subsets: ['latin'],
});

export default function GlobalError({ error, reset }) {
  return (
    <html lang="en">
      <body className={outfit.className}>
        <div className="flex h-screen w-screen flex-col items-center justify-center bg-gray-50 p-6">
          <Result
            status="error"
            title="Critical Application Error"
            subTitle="The application encountered a fatal error and couldn't start properly. This might be due to a poor connection or temporary server issue."
            extra={
              <Button
                type="primary"
                size="large"
                icon={<RedoOutlined />}
                onClick={() => window.location.reload()}
                className="rounded-full"
              >
                Restore Session
              </Button>
            }
          />
        </div>
      </body>
    </html>
  );
}
