import { useMeQuery } from '@/services/auth';
import { Button, Input, message } from 'antd';
import { RcFile } from 'antd/es/upload';
import axios from 'axios';
import { FC, FormEvent, SyntheticEvent, useState } from 'react';

const UploadAvatar: FC = () => {
    const [avatar, setAvatar] = useState('');
    const { data: authData } = useMeQuery();

    // const [file, setFile] = useState<File | null>();

    const handleUpload = (e: SyntheticEvent) => {
        const target = e.target as HTMLInputElement;

        const formData = new FormData();

        formData.append('file', target.files![0] as RcFile);
        formData.append('upload_preset', 'upload_angular');
        formData.append('clound_name', 'dh96qogra');
        axios
            .post('https://api.cloudinary.com/v1_1/dh96qogra/image/upload', formData)
            .then((res) => setAvatar(res.data.url))
            .catch((err: any) => message.error(err.message));
    };

    const handleChange = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const res = await axios.put(`http://localhost:8080/api/user/${authData?._id!}`, {
                avatar,
            });

            if (res.status === 200) {
                window.location.reload();
            }
        } catch (error: any) {
            message.error(error.message);
        }
    };

    return (
        <div className='p-2 w-[300px] h-[65px] d-flex ' >
            <Input type="file" onChange={handleUpload} className='mt-[15px] mr-2' />

            <form onSubmit={handleChange} >
                <Button className='w-[100px] mb-4'
                    type="default"
                    htmlType="submit"
                    disabled={avatar.length === 0}

                    style={{ marginTop: 16 }}
                >
                    Uploading
                </Button>
            </form>
        </div>
    );
};

export default UploadAvatar;
