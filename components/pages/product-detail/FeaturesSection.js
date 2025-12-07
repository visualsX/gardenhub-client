import DeliveryIcon from '@/public/all/delivery.svg';
import HandPickIcon from '@/public/all/hand-pick.svg';
import SecurityIcon from '@/public/all/security-safe.svg';

export default function FeaturesSection() {
  const features = [
    {
      descripton: 'Free delivery over 199 AED.',
      icon: <DeliveryIcon />,
    },
    {
      descripton: 'Hand picked plants from our farms free of pest & diseases.',
      icon: <HandPickIcon />,
    },
    {
      descripton: 'Quality guaranteed. We offer 14- days free return on our plants.',
      icon: <SecurityIcon />,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 py-8 md:grid-cols-3">
      {features.map((feature, idx) => (
        <div key={idx} className="bg-accent-gray flex flex-col items-start rounded-xl p-6">
          <div className="mb-4">{feature.icon}</div>
          <p className="mt-1 text-sm text-gray-500">{feature.descripton}</p>
        </div>
      ))}
    </div>
  );
}
