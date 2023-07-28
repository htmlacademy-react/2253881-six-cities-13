import axios from 'axios';
import { toast } from 'react-toastify';
import { getToken } from '../services/token';
import { IComment } from '../types/comments';
import { IForm } from '../components/offer-form/offer-form';
import { BASE_BACKEND_URL, APIRoute } from '../consts';

interface IUseCommentsForm {
  setComments: React.Dispatch<React.SetStateAction<IComment[] | undefined>>;
  setForm: React.Dispatch<React.SetStateAction<IForm>>;
  form: IForm;
  id: string | undefined;
}

const useCommentsForm = ({
  setComments,
  setForm,
  form,
  id,
}: IUseCommentsForm) => {
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
  return sendComment;
};

export default useCommentsForm;
