import {
	IsBoolean,
	IsEmail,
	IsNotEmpty,
	IsOptional,
	IsStrongPassword,
	Matches
} from 'class-validator'

export class SignUpDto {
	@IsNotEmpty({ message: 'Vui lòng nhập họ và tên' })
	fullname: string

	@IsNotEmpty({ message: 'Vui lòng nhập Email' })
	@IsEmail({}, { message: 'Email không đúng đinh dạng' })
	email: string

	@IsNotEmpty({ message: 'Vui lòng nhập số điện thoại' })
	@Matches(/^([+]\d{2})?\d{10}$/, {
		message: 'Số điện thoại không đúng định dang'
	})
	phone: string

	@IsOptional()
	ref: string

	@IsNotEmpty({ message: 'Vui lòng nhập mật khẩu' })
	@IsStrongPassword(
		{
			minLength: 8,
			minLowercase: 1,
			minUppercase: 1,
			minNumbers: 1,
			minSymbols: 0
		},
		{
			message: 'Mật khẩu không đủ mạnh'
		}
	)
	password: string

	@IsNotEmpty({
		message: 'Vui lòng chấp thuận với các điều khoản sử dụng của chúng tôi'
	})
	@IsBoolean({ message: 'Giá trị không chính xác' })
	tnc: boolean
}
