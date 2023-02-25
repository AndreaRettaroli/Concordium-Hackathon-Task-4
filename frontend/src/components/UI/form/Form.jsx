import { useForm } from 'react-hook-form'
import style from './Form.module.css'
import Button from '../button/Button'

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const onSubmit = (data) => console.log(data.amount)

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
      <input
        className={style.input}
        type="number"
        placeholder="0.0"
        {...register('amount', { required: true, min: 0, pattern: /^[+]?([.]\d+|\d+[.]?\d*)$/ })}
      />
      {errors.amount?.type === 'min' && <span className={style.error}>Only positive value</span>}
      {errors.amount?.type === 'pattern' && <span className={style.error}>Enter a real number</span>}
      {errors.amount?.type === 'required' && <span className={style.error}>This field is required</span>}

      <Button
        disabled={errors.amount}
        type="submit"
        submitButton
      >
        Submit
      </Button>
    </form>
  )
}

export default Form
