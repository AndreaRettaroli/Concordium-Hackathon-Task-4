import { useForm } from 'react-hook-form'
import style from './Form.module.css'
import Button from '../button/Button'

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const onSubmit = (data) => console.log(data)

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
      <input
        className={style.input}
        defaultValue="0"
        {...register('amount', { required: true })}
      />
      {errors.amount && <span>This field is required</span>}
      <Button type="submit" submitButton>
        Submit
      </Button>
    </form>
  )
}

export default Form
