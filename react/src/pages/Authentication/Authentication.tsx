import { useForm } from "react-hook-form";
import axios, { isAxiosError } from 'axios';
import { ILoginRequest } from "./type/type";
import { useState } from "react";

const Authentication = () => {

  const { register, handleSubmit, setError, formState: { errors } } = useForm<ILoginRequest>({ criteriaMode: 'all' });

  const [success, setSuccess] = useState<boolean>(false);

  const handleSubmitAuthentication = async (data: ILoginRequest) => {
    try {
      await axios.post('http://127.0.0.1:8000/api/user', data);
      setSuccess(true);
    } catch (error) {
      if (isAxiosError(error)) {
        setError('root.catchEmail', {
          type: 'server',
          message: String(error.response?.data.error),
        })
      }
    }
    return
  }
  return (
    <>
      {success === false ?
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                <form
                  style={{ width: '350px', border: '1px solid black' }}
                  className="d-flex flex-column p-3"
                  onSubmit={handleSubmit(handleSubmitAuthentication)}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">Введите ваше имя</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      placeholder="Введите ваше имя"
                      {...register('name', { required: true })}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="fullname" className="form-label">Введите вашу фамилию</label>
                    <input
                      type="text"
                      className="form-control"
                      id="fullname"
                      placeholder="Введите вашу фамилию"
                      {...register('lastName', { required: true })}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="staticEmail" className="form-label">Электронная почта</label>
                    <input
                      type="text"
                      className="form-control"
                      id="staticEmail"
                      placeholder="Введите вашу почту"
                      {...register('email', { required: true })}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="inputPassword" className="form-label">Пароль</label>
                    <input
                      type="password"
                      className="form-control"
                      id="inputPassword"
                      placeholder="Введите ваш пароль"
                      {...register('password', { required: true })}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="inputconfPassword" className="form-label">Подтверждение пароля</label>
                    <input
                      type="password"
                      className="form-control"
                      id="inputconfPassword"
                      placeholder="Повторите пароль"
                      {...register('forconfirmpassword', { required: true })}
                    />
                  </div>
                  {errors.root?.catchEmail.message !== undefined && <span>{errors.root?.catchEmail.message}</span>}
                  <button type="submit" className="btn btn-primary align-self-center">Submit</button>
                </form>
              </div>
            </div>
          </div>
        </div>
        :
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                success
              </div>
            </div>
          </div>
        </div>
      }
    </>
  );
};

export default Authentication;
