import AccountsHeader from '@/components/auth/AccountsHeader';
import AccountsSidebar from '@/components/auth/AccountsSidebar';

export default function AccountsLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col bg-gray-50">
            <AccountsHeader />
            <div className="max-layout flex flex-1 flex-col gap-8 py-8 md:flex-row">
                <AccountsSidebar />
                <main className="flex-1 rounded-2xl border border-gray-200 bg-white p-6 md:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
