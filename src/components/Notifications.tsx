import { useEffect, useState } from 'react';
import { ChevronLeft, TrendingDown, Bell as BellIcon } from 'lucide-react';
import supabase from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

type Screen = 'home' | 'basket' | 'recipe' | 'dietary' | 'social' | 'price-history' | 'notifications';

interface NotificationsProps {
  onNavigate: (screen: Screen) => void;
}

interface Notification {
  id: string;
  type: string;
  product_id: string | null;
  store_id: string | null;
  old_price: number | null;
  new_price: number | null;
  savings: number | null;
  message: string | null;
  is_read: boolean;
  created_at: string;
  product_name?: string;
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins} minute${mins === 1 ? '' : 's'} ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} hour${hrs === 1 ? '' : 's'} ago`;
  const days = Math.floor(hrs / 24);
  return `${days} day${days === 1 ? '' : 's'} ago`;
}

export function Notifications({ onNavigate }: NotificationsProps) {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) { setLoading(false); return; }

    const fetchNotifications = async () => {
      const { data, error } = await supabase
        .from('notifications')
        .select('*, products(name)')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(50);

      if (!error && data) {
        const mapped = data.map((n: any) => ({
          ...n,
          product_name: n.products?.name ?? null,
        }));
        setNotifications(mapped);

        const unreadIds = mapped.filter((n: Notification) => !n.is_read).map((n: Notification) => n.id);
        if (unreadIds.length > 0) {
          await supabase.from('notifications').update({ is_read: true }).in('id', unreadIds);
        }
      }
      setLoading(false);
    };

    fetchNotifications();
  }, [user]);

  return (
    <div className="min-h-screen bg-white">
      <div className="flex justify-between items-center p-6 border-b border-gray-200">
        <button onClick={() => onNavigate('home')}>
          <ChevronLeft className="w-6 h-6 text-gray-600" />
        </button>
        <h1 className="text-gray-800">Notifications</h1>
        <div className="w-6"></div>
      </div>

      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-gray-800">Price Drop Alerts</h3>
          <p className="text-gray-600">Stay updated on price changes for your watched items</p>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-4 border-[#4CAF50] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : notifications.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BellIcon className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-gray-800 mb-2">No notifications yet</h3>
            <p className="text-gray-600">We will notify you when prices drop on your watched items</p>
          </div>
        ) : (
          <div className="space-y-3">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`border rounded-lg p-4 ${notification.is_read ? 'bg-white border-gray-200' : 'bg-green-50 border-green-200'}`}
              >
                {notification.message && !notification.product_id ? (
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <BellIcon className="w-5 h-5 text-[#4CAF50]" />
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-800 mb-1">{notification.message}</p>
                      <p className="text-gray-500 text-xs">{timeAgo(notification.created_at)}</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <TrendingDown className="w-5 h-5 text-[#4CAF50]" />
                    </div>
                    <div className="flex-1">
                      {notification.product_name && (
                        <h4 className="text-gray-800 mb-1">{notification.product_name}</h4>
                      )}
                      {notification.message && (
                        <p className="text-gray-600 text-sm mb-1">{notification.message}</p>
                      )}
                      {notification.old_price != null && notification.new_price != null && (
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-gray-400 line-through text-sm">£{notification.old_price.toFixed(2)}</span>
                          <span className="text-[#4CAF50] font-medium">£{notification.new_price.toFixed(2)}</span>
                          {notification.savings != null && (
                            <span className="bg-green-100 text-[#4CAF50] px-2 py-0.5 rounded text-xs">
                              Save £{notification.savings.toFixed(2)}
                            </span>
                          )}
                        </div>
                      )}
                      {notification.store_id && (
                        <p className="text-gray-500 text-xs mb-1">{notification.store_id}</p>
                      )}
                      <p className="text-gray-400 text-xs">{timeAgo(notification.created_at)}</p>
                    </div>
                    {!notification.is_read && (
                      <div className="w-2 h-2 bg-[#4CAF50] rounded-full mt-1 flex-shrink-0" />
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="text-gray-800 mb-3">Notification Settings</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Price Drop Alerts</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#4CAF50]"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Basket Total Changes</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#4CAF50]"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">New Recipe Alerts</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#4CAF50]"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
