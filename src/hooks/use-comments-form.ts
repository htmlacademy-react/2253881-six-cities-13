import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { getToken } from '../services/token';
import { IComment } from '../types/comments';
import { BASE_BACKEND_URL, APIRoute } from '../consts';

interface IUseCommentsForm {
  setComments: React.Dispatch<React.SetStateAction<IComment[] | undefined>>;
  id: string | undefined;
}

type TuseCommentsFormReturn = [
  (evt: React.FormEvent<HTMLFormElement>) => void,
  React.Dispatch<React.SetStateAction<IForm>>,
  IForm
];

interface IForm {
  rating: null | number;
  comment: string;
}

const useCommentsForm = ({
  setComments,
  id,
}: IUseCommentsForm): TuseCommentsFormReturn => {
  const [form, setForm] = useState<IForm>({ rating: null, comment: '' });
  const token = getToken();
  const sendComment = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    axios
      .post<IComment>(
        `${BASE_BACKEND_URL + APIRoute.Comments + (id || '')}`,
        form,
        {
          headers: { 'x-token': token },
        }
      )
      .then(({ data }) => {
        setComments((prevComments) => {
          if (prevComments) {
            return [...prevComments, data];
          }
          return [data];
        });

        setForm({ rating: 0, comment: '' });
      })
      .catch(() => {
        if (form.comment.length < 50 && form.comment.length > 0) {
          toast.warn('Комментарий должен содержать не менее 50ти символов');
          return;
        }

        if (form.comment.length > 300) {
          toast.warn('Комментарий должен содержать не более 300т символов');
          return;
        }
        toast.warn('Проверьте форму на корректность');
      });
  };
  return [sendComment, setForm, form];
};

export default useCommentsForm;
