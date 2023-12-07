
import { Popover } from 'antd';
import { IoNotificationsOutline } from 'react-icons/io5'

const text = <span>Title</span>;

const content = (
    <div>
        <p>Content</p>
        <p>Content</p>
    </div>
);

const Notification: React.FC = () => (
    <div className='clear-both whitespace-nowrap flex'>
        <Popover placement="bottom" title={text} content={content} trigger="click">
            <span className="relative inline-block mr-5 text-2xl cursor-pointer">
                <IoNotificationsOutline />
                <span
                    className="absolute top-0 right-0 inline-flex items-center justify-center w-2 h-2 bg-red-600 rounded-full"></span>
            </span>
        </Popover>
    </div>
);

export default Notification;