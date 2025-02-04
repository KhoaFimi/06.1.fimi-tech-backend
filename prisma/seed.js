// const argon2 = require('argon2')

const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const creditCardCategoryId = '67a1cb65a9b00fdb77b23a1b'
const bankAccountCategoryId = '67a1cb65a9b00fdb77b23a1c'

const campaignData = [
	// #region:Vpbstepup
	{
		categoryId: creditCardCategoryId,
		code: 'vpbstepup',
		name: 'Vpbank - Step Up',
		advertiser: 'Ngân hàng TMCP Việt Nam Thịnh Vượng',
		link: 'https://cards.vpbank.com.vn/?utm_campaign=JarvisCustCC.Partner&utm_source=FiMi&utm_medium={{orderId}}',
		images: [
			{
				key: 'campaigns/vpbstepup_cklptt',
				url: 'https://res.cloudinary.com/dsmg2i2rl/image/upload/c_thumb,w_200,g_face/v1738636431/vpbstepup_cklptt.png'
			}
		],
		offers: [
			{
				summary:
					'Khách hàng có tổng doanh số giao dịch từ 10 triệu / kỳ sao kê trở lên:',
				offers: [
					'15% Hoàn tiền các chi tiêu trực tuyến tối đa 600.000đ/tháng',
					'4% Hoàn tiền cho ăn uống tối đa 200.000đ/tháng',
					'0.1% Cho các chi tiêu còn lại không giới hạn số tiền hoàn'
				]
			},
			{
				summary:
					'Khách hàng có tổng doanh số giao dịch dưới 10 triệu / kỳ sao kê:',
				offers: [
					'6% Hoàn tiền các chi tiêu trực tuyến tối đa 300.000đ/tháng',
					'2% Hoàn tiền cho ăn uống tối đa 100.000đ/tháng',
					'0.1% Cho các chi tiêu còn lại không giới hạn số tiền hoàn'
				]
			}
		],
		requirement: {
			minAge: 23,
			maxAge: 60,
			documents: ['CCCD']
		},
		status: 'OPEN',
		info: {
			approveTime: 'Trong vòng 05 phút',
			finalResultTime: '18h ngày thứ 2 hàng tuần',
			supportArea: ['all']
		},
		specs: [
			{
				title: 'Thời gian làm việc',
				description: ['Tối thiểu 3 tháng tại đơn vị hiện tại']
			},
			{
				title: 'Lịch sử tín dụng',
				description: ['Không có nợ xấu, nợ chú ý trong vòng 12 tháng gần nhất']
			},
			{
				title: 'Thu nhập',
				description: ['Từ 4,500,000 VNĐ/tháng']
			},
			{
				title: 'Hạn mức',
				description: ['10,000,000 VNĐ - 100,000,000 VNĐ']
			},
			{
				title: 'Thời hạn sử dụng',
				description: ['3 năm kể từ ngày phát hành']
			},
			{
				title: 'Hình thức thanh toán',
				description: ['Toàn bộ dư nợ hoặc thanh toán tối thiểu theo sao kê']
			}
		],
		commissionPolicy: {
			orderStatus: 'Ghi nhận hoa hồng',
			description:
				'Có thể tiến hành lên lệnh rút tiền khi trạng thái đơn trên báo cáo là "Ghi nhận hoa hồng"',
			commissions: [
				'300.000 đ/ thẻ phát hành có phát sinh giao dịch thành công.'
			],
			note: 'Chưa trừ 10% thuế TNCN.'
		},
		recognitionRules: {
			summary:
				'Khách hàng được ghi nhận giới thiệu thành công nếu trong vòng (≤) 30 ngày kể từ ngày được giới thiệu thỏa tất cả điều kiện sau:',
			description: [
				'Mỗi khách hàng chỉ được tính 01 thẻ duy nhất;',
				'Thẻ được phê duyệt hạn mức thành công (hạn mức > 0) và phát sinh giao dịch chi tiêu trong vòng 90 ngày từ thời điểm mở thẻ thành công.'
			]
		},
		registrationProcess: [
			'B1: Khách hàng (KH) truy cập vào đường link hoặc scan QR code trên Website, app, standee quảng cáo… và thao tác theo hướng dẫn;',
			'B2: KH điền thông tin cá nhân cơ bản;',
			'B3: KH điền đầy đủ thông tin cá nhân;',
			'B4: KH điền thông tin nghề nghiệp;',
			'B5: Hệ thống thẩm định thông tin trong vòng 3 phút;',
			'B6: Hệ thống phê duyệt hạn mức và đưa ra các dòng thẻ phù hợp;',
			'B7: Hệ thống đưa ra thêm sự lựa chọn nếu KH muốn mở thẻ tín dụng phi vật lý (thẻ ảo) để có thể sử dụng liền;',
			'B8: Hệ thống yêu cầu xác thực CCCD và eKYC;',
			'B9: KH điền thông tin người thân và thông tin bổ sung;',
			'B10: KH đọc kỹ Giấy đề nghị kiêm Hợp đồng mở thẻ và nhập OTP để xác nhận;',
			'B11: VPBank in thẻ và gửi cho KH theo địa chỉ đã đăng ký;'
		],
		rejectReason: [
			'Khách hàng nhập sai thông tin, giả mạo hồ sơ của người khác;',
			'Khách hàng nợ xấu, có 2 khoản vay tại công ty tài chính được cấp phép hoặc ngân hàng;',
			'Khách hàng đang vay nóng tại các app, website online…;',
			'Khách hàng chưa thỏa mãn các điều kiện theo chính sách phê duyệt tín dụng của ngân hàng VPBank tại từng thời kỳ.'
		],
		unqualifiedRecords: [
			'Mở thẻ cho khách lấy hoa hồng, khách không kích hoạt thẻ và dùng thẻ;',
			'Mở thẻ chỉ rút tiền mặt, đáo hạn khoản vay hoặc thẻ tín dụng khác.'
		]
	},
	// #endregion
	// #region:Vpblady
	{
		categoryId: creditCardCategoryId,
		code: 'vpblady',
		name: 'Vpbank - Lady',
		advertiser: 'Ngân hàng TMCP Việt Nam Thịnh Vượng',
		link: 'https://cards.vpbank.com.vn/?utm_campaign=JarvisCustCC.Partner&utm_source=FiMi&utm_medium={{orderId}}',
		images: [
			{
				key: 'campaigns/vpbstepup_cklptt',
				url: 'https://res.cloudinary.com/dsmg2i2rl/image/upload/c_thumb,w_200,g_face/v1738636437/vpblady_iftnik.png'
			}
		],
		offers: [
			{
				summary:
					'Khách hàng có tổng doanh số giao dịch từ 15 triệu / kỳ sao kê trở lên',
				offers: [
					'15% Giao dịch chi tiêu bảo hiểm trực tuyến tối đa 300.000đ/tháng',
					'15% Giao dịch chi tiêu giáo dục tối đa 200.000đ/tháng',
					'10% Giao dịch chi tiêu chăm sóc sắc đẹp/ Y tế tối đa 300.000đ/tháng',
					'5% Giao dịch chi tiêu siêu thị tối đa 200.000đ/tháng',
					'0.1% Giao dịch chi tiêu còn lại Khách hàng có tổng doanh số giao dịch dưới 15 triệu / kỳ sao kê',
					'7.5% Giao dịch chi tiêu bảo hiểm trực tuyến tối đa 150.000đ/tháng',
					'7.5% Giao dịch chi tiêu giáo dục tối đa 100.000đ/tháng',
					'5% Giao dịch chi tiêu chăm sóc sắc đẹp/ Y tế tối đa 150.000đ/tháng',
					'2.5% Giao dịch chi tiêu siêu thị tối đa 100.000đ/tháng',
					'0.1% Giao dịch chi tiêu còn lại',
					'Quà tặng chào mừng Lady trị giá 200.000VNĐ. Hoàn tiền 200.000 VNĐ cho chủ thẻ chính nếu tổng doanh số giao dịch chi tiêu tại nhóm ngành siêu thị đạt từ 2 triệu đồng trở lên trong vòng 30 ngày kể từ ngày phát hành thẻ.'
				]
			}
		],
		requirement: {
			minAge: 23,
			maxAge: 60,
			documents: ['CCCD']
		},
		status: 'OPEN',
		info: {
			approveTime: 'Trong vòng 05 phút',
			finalResultTime: '18h ngày thứ 2 hàng tuần',
			supportArea: ['all']
		},
		specs: [
			{
				title: 'Thời gian làm việc',
				description: ['Tối thiểu 3 tháng tại đơn vị hiện tại']
			},
			{
				title: 'Lịch sử tín dụng',
				description: ['Không có nợ xấu, nợ chú ý trong vòng 12 tháng gần nhất']
			},
			{
				title: 'Thu nhập',
				description: ['Từ 4,500,000 VNĐ/tháng']
			},
			{
				title: 'Hạn mức',
				description: ['10,000,000 VNĐ - 100,000,000 VNĐ']
			},
			{
				title: 'Thời hạn sử dụng',
				description: ['3 năm kể từ ngày phát hành']
			},
			{
				title: 'Hình thức thanh toán',
				description: ['Toàn bộ dư nợ hoặc thanh toán tối thiểu theo sao kê']
			}
		],
		commissionPolicy: {
			orderStatus: 'Ghi nhận hoa hồng',
			description:
				'Có thể tiến hành lên lệnh rút tiền khi trạng thái đơn trên báo cáo là "Ghi nhận hoa hồng"',
			commissions: [
				'300.000 đ/ thẻ phát hành có phát sinh giao dịch thành công.'
			],
			note: 'Chưa trừ 10% thuế TNCN.'
		},
		recognitionRules: {
			summary:
				'Khách hàng được ghi nhận giới thiệu thành công nếu trong vòng (≤) 30 ngày kể từ ngày được giới thiệu thỏa tất cả điều kiện sau:',
			description: [
				'Mỗi khách hàng chỉ được tính 01 thẻ duy nhất;',
				'Thẻ được phê duyệt hạn mức thành công (hạn mức > 0) và phát sinh giao dịch chi tiêu trong vòng 90 ngày từ thời điểm mở thẻ thành công.'
			]
		},
		registrationProcess: [
			'B1: Khách hàng (KH) truy cập vào đường link hoặc scan QR code trên Website, app, standee quảng cáo… và thao tác theo hướng dẫn;',
			'B2: KH điền thông tin cá nhân cơ bản;',
			'B3: KH điền đầy đủ thông tin cá nhân;',
			'B4: KH điền thông tin nghề nghiệp;',
			'B5: Hệ thống thẩm định thông tin trong vòng 3 phút;',
			'B6: Hệ thống phê duyệt hạn mức và đưa ra các dòng thẻ phù hợp;',
			'B7: Hệ thống đưa ra thêm sự lựa chọn nếu KH muốn mở thẻ tín dụng phi vật lý (thẻ ảo) để có thể sử dụng liền;',
			'B8: Hệ thống yêu cầu xác thực CCCD và eKYC;',
			'B9: KH điền thông tin người thân và thông tin bổ sung;',
			'B10: KH đọc kỹ Giấy đề nghị kiêm Hợp đồng mở thẻ và nhập OTP để xác nhận;',
			'B11: VPBank in thẻ và gửi cho KH theo địa chỉ đã đăng ký;'
		],
		rejectReason: [
			'Khách hàng nhập sai thông tin, giả mạo hồ sơ của người khác;',
			'Khách hàng nợ xấu, có 2 khoản vay tại công ty tài chính được cấp phép hoặc ngân hàng;',
			'Khách hàng đang vay nóng tại các app, website online…;',
			'Khách hàng chưa thỏa mãn các điều kiện theo chính sách phê duyệt tín dụng của ngân hàng VPBank tại từng thời kỳ.'
		],
		unqualifiedRecords: [
			'Mở thẻ cho khách lấy hoa hồng, khách không kích hoạt thẻ và dùng thẻ;',
			'Mở thẻ chỉ rút tiền mặt, đáo hạn khoản vay hoặc thẻ tín dụng khác.'
		]
	},
	// #endregion
	// #region:Vpbgenz
	{
		categoryId: creditCardCategoryId,
		code: 'vpbgenz',
		name: 'Vpbank - Genz',
		advertiser: 'Ngân hàng TMCP Việt Nam Thịnh Vượng',
		link: 'https://cards.vpbank.com.vn/?utm_campaign=JarvisCustCC.Partner&utm_source=FiMi&utm_medium={{orderId}}',
		images: [
			{
				key: 'campaigns/vpbgenz_ol7hmi',
				url: 'https://res.cloudinary.com/dsmg2i2rl/image/upload/c_thumb,w_200,g_face/v1738636436/vpbgenz_ol7hmi.png'
			}
		],
		offers: [
			{
				summary:
					'Áp dụng cho Khách hàng có tổng doanh số giao dịch từ 4 triệu/kỳ sao kê trở lên',
				offers: [
					'Áp dụng cho Khách hàng có tổng doanh số giao dịch từ 4 triệu/kỳ sao kê trở lên',
					'10% Hoàn cho giao dịch Giải trí, Fitness (*), tối đa 200,000',
					'10% Hoàn cho các giao dịch Gọi xe, Đặt đồ ăn (*), tối đa 100,000'
				]
			},
			{
				summary: 'Áp dụng chung cho tất cả Khách hàng',
				offers: [
					'0% Ưu đãi trả góp tại mọi cửa hàng;',
					'Miễn phí chuyển đổi trả góp 0% kỳ hạn 6 tháng cho các giao dịch chi tiêu (giao dịch quẹt thẻ tại máy POS và giao dịch trực tuyến) thực hiện bằng thẻ chính trong vòng 3 tháng kể từ tháng mở thẻ chính;',
					'Áp dụng cho giao dịch từ 3.000.000 VNĐ trở lên',
					'Hoàn tiền 300.000 VND cho Khách hàng mở thẻ chính thẻ tín dụng VPBank Z JCB và đạt tổng doanh số giao dịch từ 2 triệu VND trở lên trong vòng 30 ngày mở thẻ.'
				]
			}
		],
		requirement: {
			minAge: 18,
			maxAge: 60,
			documents: ['CCCD']
		},
		status: 'OPEN',
		info: {
			approveTime: 'Trong vòng 05 phút',
			finalResultTime: '18h ngày thứ 2 hàng tuần',
			supportArea: ['all']
		},
		specs: [
			{
				title: 'Thời gian làm việc',
				description: ['Tối thiểu 3 tháng tại đơn vị hiện tại']
			},
			{
				title: 'Lịch sử tín dụng',
				description: ['Không có nợ xấu, nợ chú ý trong vòng 12 tháng gần nhất']
			},
			{
				title: 'Thu nhập',
				description: ['Từ 4,500,000 VNĐ/tháng']
			},
			{
				title: 'Hạn mức',
				description: ['10,000,000 VNĐ - 100,000,000 VNĐ']
			},
			{
				title: 'Thời hạn sử dụng',
				description: ['3 năm kể từ ngày phát hành']
			},
			{
				title: 'Hình thức thanh toán',
				description: ['Toàn bộ dư nợ hoặc thanh toán tối thiểu theo sao kê']
			}
		],
		commissionPolicy: {
			orderStatus: 'Ghi nhận hoa hồng',
			description:
				'Có thể tiến hành lên lệnh rút tiền khi trạng thái đơn trên báo cáo là "Ghi nhận hoa hồng"',
			commissions: [
				'300.000 đ/ thẻ phát hành có phát sinh giao dịch thành công.'
			],
			note: 'Chưa trừ 10% thuế TNCN.'
		},
		recognitionRules: {
			summary:
				'Khách hàng được ghi nhận giới thiệu thành công nếu trong vòng (≤) 30 ngày kể từ ngày được giới thiệu thỏa tất cả điều kiện sau:',
			description: [
				'Mỗi khách hàng chỉ được tính 01 thẻ duy nhất;',
				'Thẻ được phê duyệt hạn mức thành công (hạn mức > 0) và phát sinh giao dịch chi tiêu trong vòng 90 ngày từ thời điểm mở thẻ thành công.'
			]
		},
		registrationProcess: [
			'B1: Khách hàng (KH) truy cập vào đường link hoặc scan QR code trên Website, app, standee quảng cáo… và thao tác theo hướng dẫn;',
			'B2: KH điền thông tin cá nhân cơ bản;',
			'B3: KH điền đầy đủ thông tin cá nhân;',
			'B4: KH điền thông tin nghề nghiệp;',
			'B5: Hệ thống thẩm định thông tin trong vòng 3 phút;',
			'B6: Hệ thống phê duyệt hạn mức và đưa ra các dòng thẻ phù hợp;',
			'B7: Hệ thống đưa ra thêm sự lựa chọn nếu KH muốn mở thẻ tín dụng phi vật lý (thẻ ảo) để có thể sử dụng liền;',
			'B8: Hệ thống yêu cầu xác thực CCCD và eKYC;',
			'B9: KH điền thông tin người thân và thông tin bổ sung;',
			'B10: KH đọc kỹ Giấy đề nghị kiêm Hợp đồng mở thẻ và nhập OTP để xác nhận;',
			'B11: VPBank in thẻ và gửi cho KH theo địa chỉ đã đăng ký;'
		],
		rejectReason: [
			'Khách hàng nhập sai thông tin, giả mạo hồ sơ của người khác;',
			'Khách hàng nợ xấu, có 2 khoản vay tại công ty tài chính được cấp phép hoặc ngân hàng;',
			'Khách hàng đang vay nóng tại các app, website online…;',
			'Khách hàng chưa thỏa mãn các điều kiện theo chính sách phê duyệt tín dụng của ngân hàng VPBank tại từng thời kỳ.'
		],
		unqualifiedRecords: [
			'Mở thẻ cho khách lấy hoa hồng, khách không kích hoạt thẻ và dùng thẻ;',
			'Mở thẻ chỉ rút tiền mặt, đáo hạn khoản vay hoặc thẻ tín dụng khác.'
		]
	},
	// #endregion
	// #region:Vbpmc2
	{
		categoryId: creditCardCategoryId,
		code: 'vpbmc2',
		name: 'Vpbank - MC2',
		advertiser: 'Ngân hàng TMCP Việt Nam Thịnh Vượng',
		link: 'https://cards.vpbank.com.vn/?utm_campaign=JarvisCustCC.Partner&utm_source=FiMi&utm_medium={{orderId}}',
		images: [
			{
				key: 'campaigns/vpbmc2_izgl2k',
				url: 'https://res.cloudinary.com/dsmg2i2rl/image/upload/c_thumb,w_200,g_face/v1738636430/vpbmc2_izgl2k.png'
			}
		],
		offers: [
			{
				summary:
					'Áp dụng cho Khách hàng có tổng doanh số giao dịch từ 4 triệu/kỳ sao kê trở lên',
				offers: [
					'Áp dụng cho Khách hàng có tổng doanh số giao dịch từ 4 triệu/kỳ sao kê trở lên',
					'10% Hoàn cho giao dịch Giải trí, Fitness (*), tối đa 200,000',
					'10% Hoàn cho các giao dịch Gọi xe, Đặt đồ ăn (*), tối đa 100,000'
				]
			},
			{
				summary: 'Áp dụng chung cho tất cả Khách hàng',
				offers: [
					'0% Ưu đãi trả góp tại mọi cửa hàng;',
					'Miễn phí chuyển đổi trả góp 0% kỳ hạn 6 tháng cho các giao dịch chi tiêu (giao dịch quẹt thẻ tại máy POS và giao dịch trực tuyến) thực hiện bằng thẻ chính trong vòng 3 tháng kể từ tháng mở thẻ chính;',
					'Áp dụng cho giao dịch từ 3.000.000 VNĐ trở lên',
					'Hoàn tiền 300.000 VND cho Khách hàng mở thẻ chính thẻ tín dụng VPBank Z JCB và đạt tổng doanh số giao dịch từ 2 triệu VND trở lên trong vòng 30 ngày mở thẻ.'
				]
			}
		],
		requirement: {
			minAge: 18,
			maxAge: 60,
			documents: ['CCCD']
		},
		status: 'OPEN',
		info: {
			approveTime: 'Trong vòng 05 phút',
			finalResultTime: '18h ngày thứ 2 hàng tuần',
			supportArea: ['all']
		},
		specs: [
			{
				title: 'Thời gian làm việc',
				description: ['Tối thiểu 3 tháng tại đơn vị hiện tại']
			},
			{
				title: 'Lịch sử tín dụng',
				description: ['Không có nợ xấu, nợ chú ý trong vòng 12 tháng gần nhất']
			},
			{
				title: 'Thu nhập',
				description: ['Từ 4,500,000 VNĐ/tháng']
			},
			{
				title: 'Hạn mức',
				description: ['10,000,000 VNĐ - 100,000,000 VNĐ']
			},
			{
				title: 'Thời hạn sử dụng',
				description: ['3 năm kể từ ngày phát hành']
			},
			{
				title: 'Hình thức thanh toán',
				description: ['Toàn bộ dư nợ hoặc thanh toán tối thiểu theo sao kê']
			}
		],
		commissionPolicy: {
			orderStatus: 'Ghi nhận hoa hồng',
			description:
				'Có thể tiến hành lên lệnh rút tiền khi trạng thái đơn trên báo cáo là "Ghi nhận hoa hồng"',
			commissions: [
				'300.000 đ/ thẻ phát hành có phát sinh giao dịch thành công.'
			],
			note: 'Chưa trừ 10% thuế TNCN.'
		},
		recognitionRules: {
			summary:
				'Khách hàng được ghi nhận giới thiệu thành công nếu trong vòng (≤) 30 ngày kể từ ngày được giới thiệu thỏa tất cả điều kiện sau:',
			description: [
				'Mỗi khách hàng chỉ được tính 01 thẻ duy nhất;',
				'Thẻ được phê duyệt hạn mức thành công (hạn mức > 0) và phát sinh giao dịch chi tiêu trong vòng 90 ngày từ thời điểm mở thẻ thành công.'
			]
		},
		registrationProcess: [
			'B1: Khách hàng (KH) truy cập vào đường link hoặc scan QR code trên Website, app, standee quảng cáo… và thao tác theo hướng dẫn;',
			'B2: KH điền thông tin cá nhân cơ bản;',
			'B3: KH điền đầy đủ thông tin cá nhân;',
			'B4: KH điền thông tin nghề nghiệp;',
			'B5: Hệ thống thẩm định thông tin trong vòng 3 phút;',
			'B6: Hệ thống phê duyệt hạn mức và đưa ra các dòng thẻ phù hợp;',
			'B7: Hệ thống đưa ra thêm sự lựa chọn nếu KH muốn mở thẻ tín dụng phi vật lý (thẻ ảo) để có thể sử dụng liền;',
			'B8: Hệ thống yêu cầu xác thực CCCD và eKYC;',
			'B9: KH điền thông tin người thân và thông tin bổ sung;',
			'B10: KH đọc kỹ Giấy đề nghị kiêm Hợp đồng mở thẻ và nhập OTP để xác nhận;',
			'B11: VPBank in thẻ và gửi cho KH theo địa chỉ đã đăng ký;'
		],
		rejectReason: [
			'Khách hàng nhập sai thông tin, giả mạo hồ sơ của người khác;',
			'Khách hàng nợ xấu, có 2 khoản vay tại công ty tài chính được cấp phép hoặc ngân hàng;',
			'Khách hàng đang vay nóng tại các app, website online…;',
			'Khách hàng chưa thỏa mãn các điều kiện theo chính sách phê duyệt tín dụng của ngân hàng VPBank tại từng thời kỳ.'
		],
		unqualifiedRecords: [
			'Mở thẻ cho khách lấy hoa hồng, khách không kích hoạt thẻ và dùng thẻ;',
			'Mở thẻ chỉ rút tiền mặt, đáo hạn khoản vay hoặc thẻ tín dụng khác.'
		]
	},
	// #endregion
	// #region:Vbpvna
	{
		categoryId: creditCardCategoryId,
		code: 'vpbvna',
		name: 'Vpbank - VNA',
		advertiser: 'Ngân hàng TMCP Việt Nam Thịnh Vượng',
		link: 'https://cards.vpbank.com.vn/?utm_campaign=JarvisCustCC.Partner&utm_source=FiMi&utm_medium={{orderId}}',
		images: [
			{
				key: 'campaigns/vpbvna_dunjob',
				url: 'https://res.cloudinary.com/dsmg2i2rl/image/upload/c_thumb,w_200,g_face/v1738636432/vpbvna_dunjob.png'
			}
		],
		offers: [
			{
				summary: 'Áp dụng chung cho tất cả Khách hàng',
				offers: [
					'Tích dặm Bông Sen Vàng đối với chi tiêu trong nước 26.000 VNĐ = 1 dặm',
					'Nhân 1,5 dặm bay với chi tiêu quốc tế 26.000 VNĐ = 1,5 dặm',
					'Tặng dặm Bông Sen Vàng khi chi tiêu từ 300 triệu trở lên mỗi năm',
					'Nâng hạng Titan Bông Sen Vàng khi thỏa điều kiện chi tiêu'
				]
			}
		],
		requirement: {
			minAge: 18,
			maxAge: 60,
			documents: ['CCCD']
		},
		status: 'OPEN',
		info: {
			approveTime: 'Trong vòng 05 phút',
			finalResultTime: '18h ngày thứ 2 hàng tuần',
			supportArea: ['all']
		},
		specs: [
			{
				title: 'Thời gian làm việc',
				description: ['Tối thiểu 3 tháng tại đơn vị hiện tại']
			},
			{
				title: 'Lịch sử tín dụng',
				description: ['Không có nợ xấu, nợ chú ý trong vòng 12 tháng gần nhất']
			},
			{
				title: 'Thu nhập',
				description: ['Từ 4,500,000 VNĐ/tháng']
			},
			{
				title: 'Hạn mức',
				description: ['10,000,000 VNĐ - 100,000,000 VNĐ']
			},
			{
				title: 'Thời hạn sử dụng',
				description: ['3 năm kể từ ngày phát hành']
			},
			{
				title: 'Hình thức thanh toán',
				description: ['Toàn bộ dư nợ hoặc thanh toán tối thiểu theo sao kê']
			}
		],
		commissionPolicy: {
			orderStatus: 'Ghi nhận hoa hồng',
			description:
				'Có thể tiến hành lên lệnh rút tiền khi trạng thái đơn trên báo cáo là "Ghi nhận hoa hồng"',
			commissions: [
				'300.000 đ/ thẻ phát hành có phát sinh giao dịch thành công.'
			],
			note: 'Chưa trừ 10% thuế TNCN.'
		},
		recognitionRules: {
			summary:
				'Khách hàng được ghi nhận giới thiệu thành công nếu trong vòng (≤) 30 ngày kể từ ngày được giới thiệu thỏa tất cả điều kiện sau:',
			description: [
				'Mỗi khách hàng chỉ được tính 01 thẻ duy nhất;',
				'Thẻ được phê duyệt hạn mức thành công (hạn mức > 0) và phát sinh giao dịch chi tiêu trong vòng 90 ngày từ thời điểm mở thẻ thành công.'
			]
		},
		registrationProcess: [
			'B1: Khách hàng (KH) truy cập vào đường link hoặc scan QR code trên Website, app, standee quảng cáo… và thao tác theo hướng dẫn;',
			'B2: KH điền thông tin cá nhân cơ bản;',
			'B3: KH điền đầy đủ thông tin cá nhân;',
			'B4: KH điền thông tin nghề nghiệp;',
			'B5: Hệ thống thẩm định thông tin trong vòng 3 phút;',
			'B6: Hệ thống phê duyệt hạn mức và đưa ra các dòng thẻ phù hợp;',
			'B7: Hệ thống đưa ra thêm sự lựa chọn nếu KH muốn mở thẻ tín dụng phi vật lý (thẻ ảo) để có thể sử dụng liền;',
			'B8: Hệ thống yêu cầu xác thực CCCD và eKYC;',
			'B9: KH điền thông tin người thân và thông tin bổ sung;',
			'B10: KH đọc kỹ Giấy đề nghị kiêm Hợp đồng mở thẻ và nhập OTP để xác nhận;',
			'B11: VPBank in thẻ và gửi cho KH theo địa chỉ đã đăng ký;'
		],
		rejectReason: [
			'Khách hàng nhập sai thông tin, giả mạo hồ sơ của người khác;',
			'Khách hàng nợ xấu, có 2 khoản vay tại công ty tài chính được cấp phép hoặc ngân hàng;',
			'Khách hàng đang vay nóng tại các app, website online…;',
			'Khách hàng chưa thỏa mãn các điều kiện theo chính sách phê duyệt tín dụng của ngân hàng VPBank tại từng thời kỳ.'
		],
		unqualifiedRecords: [
			'Mở thẻ cho khách lấy hoa hồng, khách không kích hoạt thẻ và dùng thẻ;',
			'Mở thẻ chỉ rút tiền mặt, đáo hạn khoản vay hoặc thẻ tín dụng khác.'
		]
	},
	// #endregion
	// #region:Tpbevo
	{
		categoryId: creditCardCategoryId,
		code: 'tpbevo',
		name: 'TPBank EVO',
		advertiser: 'Ngân hàng TMCP Tiên Phong',
		link: 'https://evocard.tpb.vn/?utm_source=avay_afffimi&utm_campaign=First&utm_medium={{orderId}}',
		images: [
			{
				key: 'campaigns/tpbevo_qslymu',
				url: 'https://res.cloudinary.com/dsmg2i2rl/image/upload/c_thumb,w_200,g_face/v1738636431/tpbevo_qslymu.svg'
			}
		],
		offers: [
			{
				summary: 'Áp dụng chung cho tất cả Khách hàng',
				offers: [
					'Giúp Khách hàng mua sắm thả phanh với giá trị hoàn tiền lên đến 10% cho các giao dịch chi tiêu mua sắm trực tuyến tại: Shopee, Tiki, Lazada, Amazon, Alibaba, Grab, Be, Gojek, Beamin, Agoda, Traveloka, Booking.com, CellphoneS, FPTshop, Hoàng Hà Mobile, PhongVu.vn,…',
					'Khách hàng sử dụng thẻ tín dụng TPBank EVO khi mua sắm qua các trang thương mại điện tử được nhận hoàn tiền không giới hạn với tỷ lệ hoàn tùy ngành hàng từ 0.5% đến 30%.',
					'Ưu đãi thả ga khi mua sắm, đi lại, ẩm thực, du lịch.',
					'Trà góp 0% lãi suất với kỳ hạn lên đến 12 tháng.'
				]
			}
		],
		requirement: {
			minAge: 22,
			maxAge: 60,
			documents: ['CCCD']
		},
		status: 'OPEN',
		info: {
			approveTime: 'Trong vòng 15 phút',
			finalResultTime: '18h ngày T+1',
			supportArea: [
				'Lâm Đồng',
				'Bình Định',
				'Tây Ninh',
				'Đắk Lắk',
				'Hồ Chí Minh',
				'Hà Nội',
				'Đà Nẵng',
				'Bà Rịa - Vũng Tàu',
				'Khánh Hòa',
				'Bình Dương',
				'Đồng Nai',
				'Cần Thơ',
				'Hải Phòng',
				'An Giang',
				'Bắc Ninh',
				'Thanh Hóa',
				'Quảng Ninh',
				'Tiền Giang',
				'Kiên Giang',
				'Lào Cai',
				'Nghệ An',
				'Long An',
				'Thái Nguyên',
				'Bình Phước',
				'Quảng Nam',
				'Thừa Thiên Huế',
				'Hưng Yên',
				'Vĩnh Phúc',
				'Thái Bình',
				'Bắc Giang'
			]
		},
		specs: [
			{
				title: 'Thời gian làm việc',
				description: ['Tối thiểu 3 tháng tại đơn vị hiện tại']
			},
			{
				title: 'Lịch sử tín dụng',
				description: ['Không có nợ xấu, nợ chú ý trong vòng 12 tháng gần nhất']
			},
			{
				title: 'Thu nhập',
				description: ['Từ 7,000,000 VNĐ/tháng']
			},
			{
				title: 'Hạn mức',
				description: ['10,000,000 VNĐ - 50,000,000 VNĐ']
			},
			{
				title: 'Thời hạn sử dụng',
				description: ['3 năm kể từ ngày phát hành']
			},
			{
				title: 'Hình thức thanh toán',
				description: ['Toàn bộ dư nợ hoặc thanh toán tối thiểu theo sao kê']
			}
		],
		commissionPolicy: {
			orderStatus: 'Ghi nhận hoa hồng',
			description:
				'Có thể tiến hành lên lệnh rút tiền khi trạng thái đơn trên báo cáo là "Ghi nhận hoa hồng"',
			commissions: [
				'300.000 đ/ thẻ phát hành có phát sinh giao dịch thành công.'
			],
			note: 'Chưa trừ 10% thuế TNCN.'
		},
		recognitionRules: {
			summary:
				'Khách hàng được ghi nhận giới thiệu thành công nếu trong vòng (≤) 30 ngày kể từ ngày được giới thiệu thỏa tất cả điều kiện sau:',
			description: [
				'Mỗi khách hàng chỉ được tính 01 thẻ duy nhất;',
				'Thẻ được phê duyệt hạn mức thành công (hạn mức > 0).'
			]
		},
		registrationProcess: [
			'B1: Khách hàng click vào link được publisher giới thiệu, hoàn tất điền thông tin.',
			'B2: Hoàn tất thông tin đăng ký.',
			'B3: Chờ thẩm định và phê duyệt.',
			'B4: Phê duyệt và phát hành thành công => ghi nhận hoa hồng.'
		],
		rejectReason: [
			'Khách hàng nhập sai thông tin, giả mạo hồ sơ của người khác;',
			'Khách hàng nợ xấu, có 2 khoản vay tại công ty tài chính được cấp phép hoặc ngân hàng;',
			'Khách hàng đang vay nóng tại các app, website online…;',
			'Khách hàng chưa thỏa mãn các điều kiện theo chính sách phê duyệt tín dụng. của ngân hàng TPBank tại từng thời kỳ'
		],
		unqualifiedRecords: [
			'Mở thẻ cho khách lấy hoa hồng, khách không kích hoạt thẻ và dùng thẻ;',
			'Mở thẻ chỉ rút tiền mặt, đáo hạn khoản vay hoặc thẻ tín dụng khác.'
		]
	},
	// #endregion
	// #region:Hdbvjp
	{
		categoryId: creditCardCategoryId,
		code: 'hdbvjp',
		name: 'HDBANK - VJP',
		advertiser: 'Ngân hàng TMCP Phát triển Thành phố Hồ Chí Minh',
		link: 'https://hdbank.page.link/?link=https://hdbank.page.link/?channel%3Ddop%26productcode%3DDOPVJ%26utm_source%3DFIMI%26utm_campaign%3Dtest%26utm_channel%3DDOP%26utm_ref%3D{{orderId}}&apn=com.vnpay.hdbank&isi=1461658565&ibi=com.vnpay.HDBank',
		images: [
			{
				key: 'campaigns/hdbvjp_ip92lz',
				url: 'https://res.cloudinary.com/dsmg2i2rl/image/upload/c_thumb,w_200,g_face/v1738636436/hdbvjp_ip92lz.svg'
			}
		],
		offers: [
			{
				summary: 'Áp dụng chung cho tất cả Khách hàng',
				offers: [
					'Tặng 5% khi mua vé máy bay Vietjet Air;',
					'Hoàn tiền 0,3% không giới hạn khi chi tiêu;',
					'Bảo hiểm du lịch toàn cầu đến 12 tỷ đồng;',
					'Ưu tiên check-in quầy Vietjet tại sân bay dành cho chủ thẻ;',
					'Giảm đến 30% chi phí đặt phòng, ăn uống hoặc dịch vụ giải trí tại Malibu Vũng Tàu, Golden Bay Đà Nẵng, Furama, Republic Plaza, The Anam…;',
					'Giảm đến 50% khi chơi Golf tại hệ thống các sân Đồng Nai Golf, Đà Lạt Palace...;',
					'Chủ thẻ được phục vụ theo hotline VIP 1800 6868 của HDBank;',
					'Trả góp lãi suất 0% tại các đối tác liên kết của HDBank;'
				]
			}
		],
		requirement: {
			minAge: 18,
			maxAge: 65,
			documents: ['CCCD']
		},
		status: 'OPEN',
		info: {
			approveTime: 'Trong vòng 15 phút',
			finalResultTime: '18h ngày T+1',
			supportArea: ['all']
		},
		specs: [
			{
				title: 'Thời gian làm việc',
				description: ['Tối thiểu 3 tháng tại đơn vị hiện tại']
			},
			{
				title: 'Lịch sử tín dụng',
				description: ['Không có nợ xấu, nợ chú ý trong vòng 12 tháng gần nhất']
			},
			{
				title: 'Thu nhập',
				description: ['Từ 7,000,000 VNĐ/tháng']
			},
			{
				title: 'Hạn mức',
				description: ['10,000,000 VNĐ - 50,000,000 VNĐ']
			},
			{
				title: 'Thời hạn sử dụng',
				description: ['3 năm kể từ ngày phát hành']
			},
			{
				title: 'Hình thức thanh toán',
				description: ['Toàn bộ dư nợ hoặc thanh toán tối thiểu theo sao kê']
			}
		],
		commissionPolicy: {
			orderStatus: 'Ghi nhận hoa hồng',
			description:
				'Có thể tiến hành lên lệnh rút tiền khi trạng thái đơn trên báo cáo là "Ghi nhận hoa hồng"',
			commissions: ['150,000 đ/ thẻ phát hành thành công.'],
			note: 'Chưa trừ 10% thuế TNCN.'
		},
		recognitionRules: {
			summary:
				'Khách hàng được ghi nhận giới thiệu thành công nếu trong vòng (≤) 30 ngày kể từ ngày được giới thiệu thỏa tất cả điều kiện sau:',
			description: [
				'KH không có mã CIF đang còn hiệu lực tại HDBank.',
				'Kích hoạt và đăng nhập vào app thành công tối thiểu 01 lần; và',
				'Tình trạng user eBanking: đang hiệu lực.',
				'Mỗi khách hàng chỉ được tính 01 thẻ và 01 user eBanking duy nhất.',
				'Thẻ được phê duyệt hạn mức thành công (hạn mức > 0).'
			]
		},
		registrationProcess: [
			'B1: Khách hàng click vào link được publisher giới thiệu, hoàn tất điền thông tin.',
			'B2: Hoàn tất thông tin đăng ký.',
			'B3: Tải và đăng nhập app HDBank.',
			'B4: Chờ thẩm định và phê duyệt..',
			'B5: Phê duyệt và phát hành thành công => ghi nhận hoa hồng'
		],
		rejectReason: [
			'Khách hàng nhập sai thông tin, giả mạo hồ sơ của người khác;',
			'Khách hàng nợ xấu, có 2 khoản vay tại công ty tài chính được cấp phép hoặc ngân hàng;',
			'Khách hàng đang vay nóng tại các app, website online…;',
			'Khách hàng chưa thỏa mãn các điều kiện theo chính sách phê duyệt tín dụng của ngân hàng HDBank tại từng thời kỳ.'
		],
		unqualifiedRecords: [
			'Mở thẻ cho khách lấy hoa hồng, khách không kích hoạt thẻ và dùng thẻ;',
			'Mở thẻ chỉ rút tiền mặt, đáo hạn khoản vay hoặc thẻ tín dụng khác.'
		]
	},
	// #endregion
	// #region:Hdb4in1
	{
		categoryId: creditCardCategoryId,
		code: 'hdb4in1',
		name: 'HDBANK - 4IN1',
		advertiser: 'Ngân hàng TMCP Phát triển Thành phố Hồ Chí Minh',
		link: 'https://hdbank.page.link/?link=https://hdbank.page.link/?channel%3Ddop%26productcode%3DDOPPLX%26utm_source%3DFIMI%26utm_campaign%3Dtest%26utm_channel%3DDOP%26utm_ref%3D{{orderId}}&apn=com.vnpay.hdbank&isi=1461658565&ibi=com.vnpay.HDBank',
		images: [
			{
				key: 'campaigns/hdb4in1_srvfda',
				url: 'https://res.cloudinary.com/dsmg2i2rl/image/upload/c_thumb,w_200,g_face/v1738636433/hdb4in1_srvfda.svg'
			}
		],
		offers: [
			{
				summary: 'Áp dụng chung cho tất cả Khách hàng',
				offers: [
					'Tích 1 điểm thưởng SkyJoy cho mỗi 100.000 đồng doanh thu giao dịch nội địa.',
					'Tích 2 điểm thưởng SkyJoy cho mỗi 100.000 đồng doanh thu giao dịch quốc tế.',
					'Tích 3 điểm thưởng SkyJoy cho mỗi 100.000 đồng doanh thu giao dịch xăng dầu.'
				]
			}
		],
		requirement: {
			minAge: 18,
			maxAge: 65,
			documents: ['CCCD']
		},
		status: 'OPEN',
		info: {
			approveTime: 'Trong vòng 15 phút',
			finalResultTime: '18h ngày T+1',
			supportArea: ['all']
		},
		specs: [
			{
				title: 'Thời gian làm việc',
				description: ['Tối thiểu 3 tháng tại đơn vị hiện tại']
			},
			{
				title: 'Lịch sử tín dụng',
				description: ['Không có nợ xấu, nợ chú ý trong vòng 12 tháng gần nhất']
			},
			{
				title: 'Thu nhập',
				description: ['Từ 7,000,000 VNĐ/tháng']
			},
			{
				title: 'Hạn mức',
				description: ['10,000,000 VNĐ - 50,000,000 VNĐ']
			},
			{
				title: 'Thời hạn sử dụng',
				description: ['3 năm kể từ ngày phát hành']
			},
			{
				title: 'Hình thức thanh toán',
				description: ['Toàn bộ dư nợ hoặc thanh toán tối thiểu theo sao kê']
			}
		],
		commissionPolicy: {
			orderStatus: 'Ghi nhận hoa hồng',
			description:
				'Có thể tiến hành lên lệnh rút tiền khi trạng thái đơn trên báo cáo là "Ghi nhận hoa hồng"',
			commissions: ['150,000 đ/ thẻ phát hành thành công.'],
			note: 'Chưa trừ 10% thuế TNCN.'
		},
		recognitionRules: {
			summary:
				'Khách hàng được ghi nhận giới thiệu thành công nếu trong vòng (≤) 30 ngày kể từ ngày được giới thiệu thỏa tất cả điều kiện sau:',
			description: [
				'KH không có mã CIF đang còn hiệu lực tại HDBank.',
				'Kích hoạt và đăng nhập vào app thành công tối thiểu 01 lần; và',
				'Tình trạng user eBanking: đang hiệu lực.',
				'Mỗi khách hàng chỉ được tính 01 thẻ và 01 user eBanking duy nhất.',
				'Thẻ được phê duyệt hạn mức thành công (hạn mức > 0).'
			]
		},
		registrationProcess: [
			'B1: Khách hàng click vào link được publisher giới thiệu, hoàn tất điền thông tin.',
			'B2: Hoàn tất thông tin đăng ký.',
			'B3: Tải và đăng nhập app HDBank.',
			'B4: Chờ thẩm định và phê duyệt..',
			'B5: Phê duyệt và phát hành thành công => ghi nhận hoa hồng'
		],
		rejectReason: [
			'Khách hàng nhập sai thông tin, giả mạo hồ sơ của người khác;',
			'Khách hàng nợ xấu, có 2 khoản vay tại công ty tài chính được cấp phép hoặc ngân hàng;',
			'Khách hàng đang vay nóng tại các app, website online…;',
			'Khách hàng chưa thỏa mãn các điều kiện theo chính sách phê duyệt tín dụng của ngân hàng HDBank tại từng thời kỳ.'
		],
		unqualifiedRecords: [
			'Mở thẻ cho khách lấy hoa hồng, khách không kích hoạt thẻ và dùng thẻ;',
			'Mở thẻ chỉ rút tiền mặt, đáo hạn khoản vay hoặc thẻ tín dụng khác.'
		]
	},
	// #endregion
	// #region:Muadee
	{
		categoryId: creditCardCategoryId,
		code: 'muadee',
		name: 'Muadee by HDBank',
		advertiser: 'Ngân hàng TMCP Phát triển Thành phố Hồ Chí Minh',
		link: 'https://muadee.page.link/?link=https://muadee.com.vn&utm_source=BTM_Fimi&utm_medium={{orderId}}&utm_campaign=aff_pub&apn=com.muadee.hdbank&amv=3&ibi=com.muadee.hdbank&isi=1633030865&efr=1&ius=muadee://&_imcp=1',
		images: [
			{
				key: 'campaigns/muadee_adodo8',
				url: 'https://res.cloudinary.com/dsmg2i2rl/image/upload/c_thumb,w_200,g_face/v1738636436/muadee_adodo8.svg'
			}
		],
		offers: [
			{
				summary: 'Áp dụng chung cho tất cả Khách hàng',
				offers: [
					'Ưu đãi lãi suất 0%, tự động chuyển đổi trả góp 3 kỳ khi thanh toán tại cửa hàng hoặc kênh online có phương thức Visa.'
				]
			}
		],
		requirement: {
			minAge: 18,
			documents: ['CCCD']
		},
		status: 'OPEN',
		info: {
			approveTime: 'Trong vòng 15 phút',
			finalResultTime: '18h ngày T+1',
			supportArea: ['all']
		},
		specs: [
			{
				title: 'Thời gian làm việc',
				description: ['Tối thiểu 3 tháng tại đơn vị hiện tại']
			},
			{
				title: 'Lịch sử tín dụng',
				description: ['Không có nợ xấu, nợ chú ý trong vòng 12 tháng gần nhất']
			},
			{
				title: 'Thu nhập',
				description: ['Từ 4,500,000 VNĐ/tháng']
			},
			{
				title: 'Hạn mức',
				description: ['7,000,000 VNĐ - 30,000,000 VNĐ']
			},
			{
				title: 'Thời hạn sử dụng',
				description: ['3 năm kể từ ngày phát hành']
			},
			{
				title: 'Hình thức thanh toán',
				description: ['Toàn bộ dư nợ hoặc thanh toán tối thiểu theo sao kê']
			}
		],
		commissionPolicy: {
			orderStatus: 'Ghi nhận hoa hồng',
			description:
				'Có thể tiến hành lên lệnh rút tiền khi trạng thái đơn trên báo cáo là "Ghi nhận hoa hồng"',
			commissions: ['150,000 đ/ thẻ phát hành thành công.'],
			note: 'Chưa trừ 10% thuế TNCN.'
		},
		recognitionRules: {
			summary:
				'Khách hàng được ghi nhận giới thiệu thành công nếu trong vòng (≤) 30 ngày kể từ ngày được giới thiệu thỏa tất cả điều kiện sau:',
			description: [
				' Mỗi khách hàng chỉ được tính 01 thẻ và 01 user duy nhất.',
				'Thẻ được phê duyệt hạn mức thành công (hạn mức > 0).',
				'Thẻ không hủy trước kỳ đối soát.'
			]
		},
		registrationProcess: [
			'B1: Khách hàng click vào link được publisher giới thiệu, hoàn tất điền thông tin.',
			'B2: Hoàn tất thông tin đăng ký.',
			'B3: Tải và đăng nhập app Muadee.',
			'B4: Chờ thẩm định và phê duyệt..',
			'B5: Phê duyệt và phát hành thành công => ghi nhận hoa hồng'
		],
		rejectReason: [
			'Khách hàng nhập sai thông tin, giả mạo hồ sơ của người khác;',
			'Khách hàng nợ xấu, có 2 khoản vay tại công ty tài chính được cấp phép hoặc ngân hàng;',
			'Khách hàng đang vay nóng tại các app, website online…;',
			'Khách hàng chưa thỏa mãn các điều kiện theo chính sách phê duyệt tín dụng của ngân hàng Muadee tại từng thời kỳ.'
		],
		unqualifiedRecords: [
			'Mở thẻ cho khách lấy hoa hồng, khách không kích hoạt thẻ và dùng thẻ;',
			'Mở thẻ chỉ rút tiền mặt, đáo hạn khoản vay hoặc thẻ tín dụng khác.'
		]
	},
	// #endregion
	// #region:Vibtra
	{
		categoryId: creditCardCategoryId,
		code: 'vibtra',
		name: 'VIB - Travel Elite',
		advertiser: 'Ngân hàng TMCP Quốc tế Việt Nam',
		link: 'https://www.vib.com.vn/vn/the-tin-dung/dang-ky/buoc-1?card_type=vib-travel-eilte&utm_source=REFERCARD&utm_medium=REFER_CARD&utm_content=Affiliate_FIMIVIB-{{orderId}}',
		images: [
			{
				key: 'campaigns/vibtra_ofdkhy',
				url: 'https://res.cloudinary.com/dsmg2i2rl/image/upload/c_thumb,w_200,g_face/v1738636434/vibtra_ofdkhy.svg'
			}
		],
		offers: [
			{
				summary: 'Áp dụng chung cho tất cả Khách hàng',
				offers: [
					'Thoải mái chi tiêu, mua sắm ở nước ngoài với phí giao dịch ngoại tệ tốt nhất thị trường, 0% cho 3 kỳ sao kê đầu tiên và chỉ 1% cho các kỳ sao kê tiếp theo',
					'Tích lũy dặm thưởng cho mọi chi tiêu',
					'Nhận 1 dặm thưởng cho mỗi 20.000 VNĐ chi tiêu qua POS tại nước ngoài',
					'Nhận 1 dặm thưởng cho mỗi 30.000 VNĐ chi tiêu còn lại',
					'Thanh toán bằng Dặm, mua sắm 0 đồng. Dễ dàng quy đổi đặm thưởng tích lũy để thanh toán tiền mua hàng'
				]
			}
		],
		requirement: {
			minAge: 22,
			maxAge: 65,
			documents: ['CCCD']
		},
		status: 'OPEN',
		info: {
			approveTime: 'Trong vòng 15 phút',
			finalResultTime: '18h ngày T+1',
			supportArea: [
				'Bà Rịa - Vũng Tàu',
				'Bình Dương',
				'Cà Mau',
				'Cần Thơ',
				'Đà Nẵng',
				'Đồng Nai',
				'Hà Nội',
				'Hồ Chí Minh',
				'Khánh Hoà',
				'Quảng Ngãi',
				'Tây Ninh',
				'Thừa Thiên Huế',
				'Hải Phòng',
				'An Giang',
				'Bình Định',
				'Đắk Lắk',
				'Đồng Tháp',
				'Hải Dương',
				'Kiên Giang',
				'Lâm Đồng',
				'Nghệ An',
				'Phú Thọ',
				'Quảng Ninh',
				'Thái Bình',
				'Thái Nguyên',
				'Thanh Hoá',
				'Vĩnh Phúc',
				'Tiền Giang'
			]
		},
		specs: [
			{
				title: 'Thời gian làm việc',
				description: ['Tối thiểu 3 tháng tại đơn vị hiện tại']
			},
			{
				title: 'Lịch sử tín dụng',
				description: ['Không có nợ xấu, nợ chú ý trong vòng 12 tháng gần nhất']
			},
			{
				title: 'Thu nhập',
				description: ['Từ 20,000,000 VNĐ/tháng']
			},
			{
				title: 'Hạn mức',
				description: ['10,000,000 VNĐ - 100,000,000 VNĐ']
			},
			{
				title: 'Thời hạn sử dụng',
				description: ['3 năm kể từ ngày phát hành']
			},
			{
				title: 'Hình thức thanh toán',
				description: ['Toàn bộ dư nợ hoặc thanh toán tối thiểu theo sao kê']
			}
		],
		commissionPolicy: {
			orderStatus: 'Ghi nhận hoa hồng',
			description:
				'Có thể tiến hành lên lệnh rút tiền khi trạng thái đơn trên báo cáo là "Ghi nhận hoa hồng"',
			commissions: ['800,000 đ/ thẻ phát hành thành công hạn mức > 0 đồng.'],
			note: 'Chưa trừ 10% thuế TNCN.'
		},
		recognitionRules: {
			summary:
				'Khách hàng được ghi nhận giới thiệu thành công nếu trong vòng (≤) 30 ngày kể từ ngày được giới thiệu thỏa tất cả điều kiện sau:',
			description: [
				'Mỗi khách hàng chỉ được tính 01 thẻ duy nhất.',
				'Thẻ được phê duyệt hạn mức thành công (hạn mức >= 0).'
			]
		},
		registrationProcess: [
			'B1: Khách hàng click vào link được publisher giới thiệu, hoàn tất điền thông tin.',
			'B2: Hoàn tất thông tin đăng ký.',
			'B3: Chờ thẩm định và phê duyệt.',
			'B54 Phê duyệt và phát hành thành công => ghi nhận hoa hồng'
		],
		rejectReason: [
			'Khách hàng nhập sai thông tin, giả mạo hồ sơ của người khác;',
			'Khách hàng nợ xấu, có 2 khoản vay tại công ty tài chính được cấp phép hoặc ngân hàng;',
			'Khách hàng đang vay nóng tại các app, website online…;',
			'Khách hàng chưa thỏa mãn các điều kiện theo chính sách phê duyệt tín dụng của ngân hàng VIB tại từng thời kỳ.'
		],
		unqualifiedRecords: [
			'Mở thẻ cho khách lấy hoa hồng, khách không kích hoạt thẻ và dùng thẻ;',
			'Mở thẻ chỉ rút tiền mặt, đáo hạn khoản vay hoặc thẻ tín dụng khác.'
		]
	},
	// #endregion
	// #region:Vibsup
	{
		categoryId: creditCardCategoryId,
		code: 'vibsup',
		name: 'VIB - Super card',
		advertiser: 'Ngân hàng TMCP Quốc tế Việt Nam',
		link: 'https://www.vib.com.vn/vn/the-tin-dung/dang-ky/buoc-1?card_type=vib-supercard&utm_source=Public_Website&utm_medium=Affiliate_FIMIVIB-{{orderId}}-&utm_content=Affiliate_FIMIVIB-{{orderId}}',
		images: [
			{
				key: 'campaigns/vibsup_u1ngvy',
				url: 'https://res.cloudinary.com/dsmg2i2rl/image/upload/c_thumb,w_200,g_face/v1738636433/vibsup_u1ngvy.svg'
			}
		],
		offers: [
			{
				summary:
					'Nhận số Điểm thưởng tích lũy theo giá trị giao dịch chi tiêu thuộc 1 trong 6 nhóm Danh Mục Chi Tiêu được đăng ký như sau:',
				offers: [
					'Ẩm thực: 15%;',
					'Du lịch: 15%;',
					'Mua sắm: 15%;',
					'Ẩm thực/Du lịch/Mua sắm: 10%;',
					'Giao dịch trực tuyến: 10%;',
					'Giao dịch nước ngoài: 10%'
				]
			},
			{
				summary:
					'Nhận số Điểm thưởng tích lũy 0.1% cho các giao dịch chi tiêu còn lại không thuộc Nhóm Danh Mục Chi Tiêu đã đăng ký',
				offers: []
			},
			{
				summary: 'Điểm thưởng tích lũy tối đa/kỳ sao kê: 1.000.000 Điểm thưởng',
				offers: []
			}
		],
		requirement: {
			minAge: 20,
			maxAge: 65,
			documents: ['CCCD']
		},
		status: 'OPEN',
		info: {
			approveTime: 'Trong vòng 15 phút',
			finalResultTime: '18h ngày T+1',
			supportArea: [
				'Bà Rịa - Vũng Tàu',
				'Bình Dương',
				'Cà Mau',
				'Cần Thơ',
				'Đà Nẵng',
				'Đồng Nai',
				'Hà Nội',
				'Hồ Chí Minh',
				'Khánh Hoà',
				'Quảng Ngãi',
				'Tây Ninh',
				'Thừa Thiên Huế',
				'Hải Phòng',
				'An Giang',
				'Bình Định',
				'Đắk Lắk',
				'Đồng Tháp',
				'Hải Dương',
				'Kiên Giang',
				'Lâm Đồng',
				'Nghệ An',
				'Phú Thọ',
				'Quảng Ninh',
				'Thái Bình',
				'Thái Nguyên',
				'Thanh Hoá',
				'Vĩnh Phúc',
				'Tiền Giang'
			]
		},
		specs: [
			{
				title: 'Thời gian làm việc',
				description: ['Tối thiểu 3 tháng tại đơn vị hiện tại']
			},
			{
				title: 'Lịch sử tín dụng',
				description: ['Không có nợ xấu, nợ chú ý trong vòng 12 tháng gần nhất']
			},
			{
				title: 'Thu nhập',
				description: ['Từ 10,000,000 VNĐ/tháng']
			},
			{
				title: 'Hạn mức',
				description: ['10,000,000 VNĐ - 100,000,000 VNĐ']
			},
			{
				title: 'Thời hạn sử dụng',
				description: ['3 năm kể từ ngày phát hành']
			},
			{
				title: 'Hình thức thanh toán',
				description: ['Toàn bộ dư nợ hoặc thanh toán tối thiểu theo sao kê']
			}
		],
		commissionPolicy: {
			orderStatus: 'Ghi nhận hoa hồng',
			description:
				'Có thể tiến hành lên lệnh rút tiền khi trạng thái đơn trên báo cáo là "Ghi nhận hoa hồng"',
			commissions: ['500,000 đ/ thẻ phát hành thành công hạn mức > 0 đồng.'],
			note: 'Chưa trừ 10% thuế TNCN.'
		},
		recognitionRules: {
			summary:
				'Khách hàng được ghi nhận giới thiệu thành công nếu trong vòng (≤) 30 ngày kể từ ngày được giới thiệu thỏa tất cả điều kiện sau:',
			description: [
				'Mỗi khách hàng chỉ được tính 01 thẻ duy nhất.',
				'Thẻ được phê duyệt hạn mức thành công (hạn mức >= 0).'
			]
		},
		registrationProcess: [
			'B1: Khách hàng click vào link được publisher giới thiệu, hoàn tất điền thông tin.',
			'B2: Hoàn tất thông tin đăng ký.',
			'B3: Chờ thẩm định và phê duyệt.',
			'B54 Phê duyệt và phát hành thành công => ghi nhận hoa hồng'
		],
		rejectReason: [
			'Khách hàng nhập sai thông tin, giả mạo hồ sơ của người khác;',
			'Khách hàng nợ xấu, có 2 khoản vay tại công ty tài chính được cấp phép hoặc ngân hàng;',
			'Khách hàng đang vay nóng tại các app, website online…;',
			'Khách hàng chưa thỏa mãn các điều kiện theo chính sách phê duyệt tín dụng của ngân hàng VIB tại từng thời kỳ.'
		],
		unqualifiedRecords: [
			'Mở thẻ cho khách lấy hoa hồng, khách không kích hoạt thẻ và dùng thẻ;',
			'Mở thẻ chỉ rút tiền mặt, đáo hạn khoản vay hoặc thẻ tín dụng khác.'
		]
	},
	// #endregion
	// #region:Vibpre
	{
		categoryId: creditCardCategoryId,
		code: 'vibpre',
		name: 'VIB - Premier Boundless',
		advertiser: 'Ngân hàng TMCP Quốc tế Việt Nam',
		link: 'https://www.vib.com.vn/vn/the-tin-dung/dang-ky/buoc-1?card_type=vib-premier-boundless&utm_source=REFERCARD&utm_medium=REFER_CARD&utm_content=Affiliate_FIMIVIB-{{orderId}}',
		images: [
			{
				key: 'campaigns/vibpre_xlyray',
				url: 'https://res.cloudinary.com/dsmg2i2rl/image/upload/c_thumb,w_200,g_face/v1738636431/vibpre_xlyray.svg'
			}
		],
		offers: [
			{
				summary: 'Áp dụng chung cho tất cả Khách hàng',
				offers: [
					'Ưu đãi đặc quyền dành riêng cho Chủ thẻ VIB Premier Boundless',
					'Đặc quyền nâng hạng thẻ Titan, Gold, Platinum của chương trình Bông Sen Vàng - Vietnam Airlines cho chủ thẻ chính VIB Premier Boundless',
					'Giảm 10% số dặm thưởng khi thực hiện lấy thưởng tại Vietnam Airlines',
					'Tích lũy dặm thưởng cho mọi chi tiêu',
					'Nhận 1 dặm thưởng cho mỗi 15.000 VNĐ chi tiêu tại Vietnam Airlines',
					'Nhận 1 dặm thưởng cho mỗi 25.000 VNĐ chi tiêu tại nước ngoài',
					'Nhận 1 dặm thưởng cho mỗi 30.000 VNĐ chi tiêu trong nước',
					'Dặm thưởng được tự động tích lũy và quy đổi sang tài khoản Hội viên Bông Sen Vàng'
				]
			}
		],
		requirement: {
			minAge: 20,
			maxAge: 65,
			documents: ['CCCD']
		},
		status: 'OPEN',
		info: {
			approveTime: 'Trong vòng 15 phút',
			finalResultTime: '18h ngày T+1',
			supportArea: [
				'Bà Rịa - Vũng Tàu',
				'Bình Dương',
				'Cà Mau',
				'Cần Thơ',
				'Đà Nẵng',
				'Đồng Nai',
				'Hà Nội',
				'Hồ Chí Minh',
				'Khánh Hoà',
				'Quảng Ngãi',
				'Tây Ninh',
				'Thừa Thiên Huế',
				'Hải Phòng',
				'An Giang',
				'Bình Định',
				'Đắk Lắk',
				'Đồng Tháp',
				'Hải Dương',
				'Kiên Giang',
				'Lâm Đồng',
				'Nghệ An',
				'Phú Thọ',
				'Quảng Ninh',
				'Thái Bình',
				'Thái Nguyên',
				'Thanh Hoá',
				'Vĩnh Phúc',
				'Tiền Giang'
			]
		},
		specs: [
			{
				title: 'Thời gian làm việc',
				description: ['Tối thiểu 3 tháng tại đơn vị hiện tại']
			},
			{
				title: 'Lịch sử tín dụng',
				description: ['Không có nợ xấu, nợ chú ý trong vòng 12 tháng gần nhất']
			},
			{
				title: 'Thu nhập',
				description: ['Từ 20,000,000 VNĐ/tháng']
			},
			{
				title: 'Hạn mức',
				description: ['10,000,000 VNĐ - 100,000,000 VNĐ']
			},
			{
				title: 'Thời hạn sử dụng',
				description: ['3 năm kể từ ngày phát hành']
			},
			{
				title: 'Hình thức thanh toán',
				description: ['Toàn bộ dư nợ hoặc thanh toán tối thiểu theo sao kê']
			}
		],
		commissionPolicy: {
			orderStatus: 'Ghi nhận hoa hồng',
			description:
				'Có thể tiến hành lên lệnh rút tiền khi trạng thái đơn trên báo cáo là "Ghi nhận hoa hồng"',
			commissions: ['800,000 đ/ thẻ phát hành thành công hạn mức > 0 đồng.'],
			note: 'Chưa trừ 10% thuế TNCN.'
		},
		recognitionRules: {
			summary:
				'Khách hàng được ghi nhận giới thiệu thành công nếu trong vòng (≤) 30 ngày kể từ ngày được giới thiệu thỏa tất cả điều kiện sau:',
			description: [
				'Mỗi khách hàng chỉ được tính 01 thẻ duy nhất.',
				'Thẻ được phê duyệt hạn mức thành công (hạn mức >= 0).'
			]
		},
		registrationProcess: [
			'B1: Khách hàng click vào link được publisher giới thiệu, hoàn tất điền thông tin.',
			'B2: Hoàn tất thông tin đăng ký.',
			'B3: Chờ thẩm định và phê duyệt.',
			'B54 Phê duyệt và phát hành thành công => ghi nhận hoa hồng'
		],
		rejectReason: [
			'Khách hàng nhập sai thông tin, giả mạo hồ sơ của người khác;',
			'Khách hàng nợ xấu, có 2 khoản vay tại công ty tài chính được cấp phép hoặc ngân hàng;',
			'Khách hàng đang vay nóng tại các app, website online…;',
			'Khách hàng chưa thỏa mãn các điều kiện theo chính sách phê duyệt tín dụng của ngân hàng VIB tại từng thời kỳ.'
		],
		unqualifiedRecords: [
			'Mở thẻ cho khách lấy hoa hồng, khách không kích hoạt thẻ và dùng thẻ;',
			'Mở thẻ chỉ rút tiền mặt, đáo hạn khoản vay hoặc thẻ tín dụng khác.'
		]
	},
	// #endregion
	// #region:Vibrew
	{
		categoryId: creditCardCategoryId,
		code: 'vibrew',
		name: 'VIB - Rewards Unlimited',
		advertiser: 'Ngân hàng TMCP Quốc tế Việt Nam',
		link: 'https://www.vib.com.vn/vn/the-tin-dung/dang-ky/buoc-1?card_type=vib-rewards-unlimited&utm_source=REFERCARD&utm_medium=REFER_CARD&utm_content=Affiliate_FIMIVIB-{{orderId}}',
		images: [
			{
				key: 'campaigns/vibrew_oacd96',
				url: 'https://res.cloudinary.com/dsmg2i2rl/image/upload/c_thumb,w_200,g_face/v1738636432/vibrew_oacd96.svg'
			}
		],
		offers: [
			{
				summary: 'Tích lũy điểm thưởng không giới hạn',
				offers: [
					'1.000 VNĐ = 10 điểm thưởng chi tiêu tại POS Trung tâm mua sắm và Cửa hàng miễn thuế',
					'1.000 VNĐ = 5 điểm thưởng chi tiêu tại POS Siêu thị',
					'1.000 VNĐ = 1 điểm thưởng chi tiêu còn lại'
				]
			},
			{
				summary:
					'Nhân 2 tổng điểm thưởng cho tổng chi tiêu từ 10 triệu đồng/kỳ sao kê',
				offers: []
			}
		],
		requirement: {
			minAge: 20,
			maxAge: 65,
			documents: ['CCCD']
		},
		status: 'OPEN',
		info: {
			approveTime: 'Trong vòng 15 phút',
			finalResultTime: '18h ngày T+1',
			supportArea: [
				'Bà Rịa - Vũng Tàu',
				'Bình Dương',
				'Cà Mau',
				'Cần Thơ',
				'Đà Nẵng',
				'Đồng Nai',
				'Hà Nội',
				'Hồ Chí Minh',
				'Khánh Hoà',
				'Quảng Ngãi',
				'Tây Ninh',
				'Thừa Thiên Huế',
				'Hải Phòng',
				'An Giang',
				'Bình Định',
				'Đắk Lắk',
				'Đồng Tháp',
				'Hải Dương',
				'Kiên Giang',
				'Lâm Đồng',
				'Nghệ An',
				'Phú Thọ',
				'Quảng Ninh',
				'Thái Bình',
				'Thái Nguyên',
				'Thanh Hoá',
				'Vĩnh Phúc',
				'Tiền Giang'
			]
		},
		specs: [
			{
				title: 'Thời gian làm việc',
				description: ['Tối thiểu 3 tháng tại đơn vị hiện tại']
			},
			{
				title: 'Lịch sử tín dụng',
				description: ['Không có nợ xấu, nợ chú ý trong vòng 12 tháng gần nhất']
			},
			{
				title: 'Thu nhập',
				description: ['Từ 20,000,000 VNĐ/tháng']
			},
			{
				title: 'Hạn mức',
				description: ['10,000,000 VNĐ - 100,000,000 VNĐ']
			},
			{
				title: 'Thời hạn sử dụng',
				description: ['3 năm kể từ ngày phát hành']
			},
			{
				title: 'Hình thức thanh toán',
				description: ['Toàn bộ dư nợ hoặc thanh toán tối thiểu theo sao kê']
			}
		],
		commissionPolicy: {
			orderStatus: 'Ghi nhận hoa hồng',
			description:
				'Có thể tiến hành lên lệnh rút tiền khi trạng thái đơn trên báo cáo là "Ghi nhận hoa hồng"',
			commissions: ['400,000 đ/ thẻ phát hành thành công hạn mức > 0 đồng.'],
			note: 'Chưa trừ 10% thuế TNCN.'
		},
		recognitionRules: {
			summary:
				'Khách hàng được ghi nhận giới thiệu thành công nếu trong vòng (≤) 30 ngày kể từ ngày được giới thiệu thỏa tất cả điều kiện sau:',
			description: [
				'Mỗi khách hàng chỉ được tính 01 thẻ duy nhất.',
				'Thẻ được phê duyệt hạn mức thành công (hạn mức >= 0).'
			]
		},
		registrationProcess: [
			'B1: Khách hàng click vào link được publisher giới thiệu, hoàn tất điền thông tin.',
			'B2: Hoàn tất thông tin đăng ký.',
			'B3: Chờ thẩm định và phê duyệt.',
			'B54 Phê duyệt và phát hành thành công => ghi nhận hoa hồng'
		],
		rejectReason: [
			'Khách hàng nhập sai thông tin, giả mạo hồ sơ của người khác;',
			'Khách hàng nợ xấu, có 2 khoản vay tại công ty tài chính được cấp phép hoặc ngân hàng;',
			'Khách hàng đang vay nóng tại các app, website online…;',
			'Khách hàng chưa thỏa mãn các điều kiện theo chính sách phê duyệt tín dụng của ngân hàng VIB tại từng thời kỳ.'
		],
		unqualifiedRecords: [
			'Mở thẻ cho khách lấy hoa hồng, khách không kích hoạt thẻ và dùng thẻ;',
			'Mở thẻ chỉ rút tiền mặt, đáo hạn khoản vay hoặc thẻ tín dụng khác.'
		]
	},
	// #endregion
	// #region:Vibcas
	{
		categoryId: creditCardCategoryId,
		code: 'vibcas',
		name: 'VIB - Cash back',
		advertiser: 'Ngân hàng TMCP Quốc tế Việt Nam',
		link: 'https://www.vib.com.vn/vn/the-tin-dung/dang-ky/buoc-1?card_type=vib-cashback&utm_source=REFERCARD&utm_medium=REFER_CARD&utm_content=Affiliate_FIMIVIB-{{orderId}}',
		images: [
			{
				key: 'campaigns/vibcas_in9gc8',
				url: 'https://res.cloudinary.com/dsmg2i2rl/image/upload/c_thumb,w_200,g_face/v1738636430/vibcas_in9gc8.svg'
			}
		],
		offers: [
			{
				summary: 'Nhận tích điểm hoàn tiền không giới hạn, lên đến 10%',
				offers: []
			},

			{
				summary:
					'Chương trình 1: Nhận số Điểm thưởng với tỷ lệ 0,1% không giới hạn trên toàn bộ số tiền chi tiêu hợp lệ',
				offers: []
			},
			{
				summary:
					'Chương trình 2: Nhận số Điểm thưởng lên đến 10% (tối đa 2 triệu điểm thưởng/tháng) tương ứng điều kiện tổng số tiền chi tiêu và Nhóm Danh Mục Chi Tiêu đăng ký tại đây',
				offers: []
			},
			{
				summary: 'Nhóm Danh Mục Chi Tiêu bao gồm:',
				offers: [
					'Ẩm thực (Foody,Cafe Katinat, Hokkaido, thanh toán PAYOO,... )',
					'Giải trí (Apple, Google, ClickTouch, CJ CGV VIETNAM,…)',
					'Dịch vụ Marketing/Quảng cáo (TIKTOK ADS, Google ADS, FACEBOOK ADS,...)'
				]
			},
			{
				summary:
					' Tỷ lệ tích lũy: Tổng số tiền chi tiêu của tất cả các giao dịch hợp lệ của kỳ sao kê liền trước Thẻ VIB Cash Back đạt:',
				offers: [
					'Đến 50 triệu VNĐ: 5% (Số điểm thưởng tích lũy tối đa: 800.000 VNĐ/kỳ sao kê)',
					'Từ trên 50 triệu VNĐ đến 100 triệu VNĐ: 8% (Số điểm thưởng tích lũy tối đa 1.000.000 VNĐ/Kỳ sao kê)',
					'Trên 100 triệu VNĐ: 10% (Số điểm thưởng tích lũy tối đa: 2.000.000 VNĐ/Kỳ sao kê)'
				]
			}
		],
		requirement: {
			minAge: 20,
			maxAge: 65,
			documents: ['CCCD']
		},
		status: 'OPEN',
		info: {
			approveTime: 'Trong vòng 15 phút',
			finalResultTime: '18h ngày T+1',
			supportArea: [
				'Bà Rịa - Vũng Tàu',
				'Bình Dương',
				'Cà Mau',
				'Cần Thơ',
				'Đà Nẵng',
				'Đồng Nai',
				'Hà Nội',
				'Hồ Chí Minh',
				'Khánh Hoà',
				'Quảng Ngãi',
				'Tây Ninh',
				'Thừa Thiên Huế',
				'Hải Phòng',
				'An Giang',
				'Bình Định',
				'Đắk Lắk',
				'Đồng Tháp',
				'Hải Dương',
				'Kiên Giang',
				'Lâm Đồng',
				'Nghệ An',
				'Phú Thọ',
				'Quảng Ninh',
				'Thái Bình',
				'Thái Nguyên',
				'Thanh Hoá',
				'Vĩnh Phúc',
				'Tiền Giang'
			]
		},
		specs: [
			{
				title: 'Thời gian làm việc',
				description: ['Tối thiểu 3 tháng tại đơn vị hiện tại']
			},
			{
				title: 'Lịch sử tín dụng',
				description: ['Không có nợ xấu, nợ chú ý trong vòng 12 tháng gần nhất']
			},
			{
				title: 'Thu nhập',
				description: ['Từ 15,000,000 VNĐ/tháng']
			},
			{
				title: 'Hạn mức',
				description: ['10,000,000 VNĐ - 100,000,000 VNĐ']
			},
			{
				title: 'Thời hạn sử dụng',
				description: ['3 năm kể từ ngày phát hành']
			},
			{
				title: 'Hình thức thanh toán',
				description: ['Toàn bộ dư nợ hoặc thanh toán tối thiểu theo sao kê']
			}
		],
		commissionPolicy: {
			orderStatus: 'Ghi nhận hoa hồng',
			description:
				'Có thể tiến hành lên lệnh rút tiền khi trạng thái đơn trên báo cáo là "Ghi nhận hoa hồng"',
			commissions: ['500,000 đ/ thẻ phát hành thành công hạn mức > 0 đồng.'],
			note: 'Chưa trừ 10% thuế TNCN.'
		},
		recognitionRules: {
			summary:
				'Khách hàng được ghi nhận giới thiệu thành công nếu trong vòng (≤) 30 ngày kể từ ngày được giới thiệu thỏa tất cả điều kiện sau:',
			description: [
				'Mỗi khách hàng chỉ được tính 01 thẻ duy nhất.',
				'Thẻ được phê duyệt hạn mức thành công (hạn mức >= 0).'
			]
		},
		registrationProcess: [
			'B1: Khách hàng click vào link được publisher giới thiệu, hoàn tất điền thông tin.',
			'B2: Hoàn tất thông tin đăng ký.',
			'B3: Chờ thẩm định và phê duyệt.',
			'B54 Phê duyệt và phát hành thành công => ghi nhận hoa hồng'
		],
		rejectReason: [
			'Khách hàng nhập sai thông tin, giả mạo hồ sơ của người khác;',
			'Khách hàng nợ xấu, có 2 khoản vay tại công ty tài chính được cấp phép hoặc ngân hàng;',
			'Khách hàng đang vay nóng tại các app, website online…;',
			'Khách hàng chưa thỏa mãn các điều kiện theo chính sách phê duyệt tín dụng của ngân hàng VIB tại từng thời kỳ.'
		],
		unqualifiedRecords: [
			'Mở thẻ cho khách lấy hoa hồng, khách không kích hoạt thẻ và dùng thẻ;',
			'Mở thẻ chỉ rút tiền mặt, đáo hạn khoản vay hoặc thẻ tín dụng khác.'
		]
	},
	// #endregion
	// #region:Vibfam
	{
		categoryId: creditCardCategoryId,
		code: 'vibfam',
		name: 'VIB - Family Link',
		advertiser: 'Ngân hàng TMCP Quốc tế Việt Nam',
		link: 'https://www.vib.com.vn/vn/the-tin-dung/dang-ky/buoc-1?card_type=vib-family-link&utm_source=REFERCARD&utm_medium=REFER_CARD&utm_content=Affiliate_FIMIVIB-{{orderId}}',
		images: [
			{
				key: 'campaigns/vibfam_rtjjgb',
				url: 'https://res.cloudinary.com/dsmg2i2rl/image/upload/c_thumb,w_200,g_face/v1738636430/vibfam_rtjjgb.svg'
			}
		],
		offers: [
			{
				summary: 'Áp dụng cho toàn bộ khách hàng',
				offers: [
					'Trả góp 0% (không phí, không lãi) khi chi tiêu ở lĩnh vực giáo dục',
					'Kỳ hạn trả góp: 3 tháng; 06 tháng',
					'Áp dụng 01 giao dịch trả góp/01KH/01 thời điểm',
					'Gửi tiết kiệm cho con Daily Saving tự động bằng chính Smile/Điểm thưởng tích lũy: Bạn có thể chủ động đăng ký tự động chuyển Smile/Điểm thưởng sang tài khoản tiết kiệm Daily Saving qua hotline 1800 8195 để nâng cao giá trị tích lũy',
					'Smile/Điểm thưởng được quy đổi sang tiền mặt/ eVoucher/ Phí thường niên thông qua MyVIB và có thể chuyển Smile/Điểm thưởng giữa các Thẻ đã liên kết'
				]
			},
			{
				summary: 'Chương trình 1: Thẻ phát hành trước ngày 27/04/2024.',
				offers: [
					'Tích lũy Smile cho các chi tiêu gắn kết gia đình',
					'Tặng 1.000 suất học bổng trị giá 1.000.000 VNĐ/năm cho 1.000 Chủ Thẻ có con nhỏ và có chi tiêu cao nhất hàng năm.',
					'Tặng 100.000 Smile vào ngày sinh nhật của con Chủ Thẻ',
					'40 Smile = 1.000 VNĐ chi tiêu vào các sự kiện đặc biệt (sinh nhật, valentine và ngày cưới) từ năm thứ 3 trở đi, 30 Smile = 1.000 VNĐ chi tiêu năm thứ 2 và 20 Smile = 1.000 VNĐ chi tiêu năm đầu',
					'20 Smile = 1.000 VNĐ chi tiêu tại các lĩnh vực giải trí cho trẻ nhỏ, y tế, giáo dục và chi tiêu ăn uống cuối tuần',
					'1 Smile = 1.000 VNĐ cho mọi chi tiêu còn lại',
					'Smile tích lũy tối đa: 1.000.000 smile/kỳ sao kê đối với tất cả giao dịch'
				]
			},
			{
				summary:
					'Chương trình 2: Thẻ phát hành từ ngày 27/04/2024; hoặc trước ngày 27/04/2024 và có đăng ký Danh mục chi tiêu',
				offers: [
					'Hoàn đến 10% cho chi tiêu thuộc một trong các Danh mục: Giáo dục, Bảo hiểm, Y Tế'
				]
			},
			{
				summary:
					'Mức hoàn trên tổng giao dịch hợp lệ của kỳ sao kê liền trước của các Thẻ đã liên kết:',
				offers: [
					'Đến 50 triệu VNĐ: 5%',
					'Từ trên 50 triệu VNĐ đến 100 triệu VNĐ: 8%',
					'Trên 100 triệu VNĐ: 10%',
					'Hoàn 0.1% chi tiêu còn lại'
				]
			},
			{
				summary: 'ức hoàn tối đa: 1.000.000 Điểm thưởng/kỳ sao kê',
				offers: []
			}
		],
		requirement: {
			minAge: 20,
			maxAge: 65,
			documents: ['CCCD']
		},
		status: 'OPEN',
		info: {
			approveTime: 'Trong vòng 15 phút',
			finalResultTime: '18h ngày T+1',
			supportArea: [
				'Bà Rịa - Vũng Tàu',
				'Bình Dương',
				'Cà Mau',
				'Cần Thơ',
				'Đà Nẵng',
				'Đồng Nai',
				'Hà Nội',
				'Hồ Chí Minh',
				'Khánh Hoà',
				'Quảng Ngãi',
				'Tây Ninh',
				'Thừa Thiên Huế',
				'Hải Phòng',
				'An Giang',
				'Bình Định',
				'Đắk Lắk',
				'Đồng Tháp',
				'Hải Dương',
				'Kiên Giang',
				'Lâm Đồng',
				'Nghệ An',
				'Phú Thọ',
				'Quảng Ninh',
				'Thái Bình',
				'Thái Nguyên',
				'Thanh Hoá',
				'Vĩnh Phúc',
				'Tiền Giang'
			]
		},
		specs: [
			{
				title: 'Thời gian làm việc',
				description: ['Tối thiểu 3 tháng tại đơn vị hiện tại']
			},
			{
				title: 'Lịch sử tín dụng',
				description: ['Không có nợ xấu, nợ chú ý trong vòng 12 tháng gần nhất']
			},
			{
				title: 'Thu nhập',
				description: ['Từ 15,000,000 VNĐ/tháng']
			},
			{
				title: 'Hạn mức',
				description: ['10,000,000 VNĐ - 100,000,000 VNĐ']
			},
			{
				title: 'Thời hạn sử dụng',
				description: ['3 năm kể từ ngày phát hành']
			},
			{
				title: 'Hình thức thanh toán',
				description: ['Toàn bộ dư nợ hoặc thanh toán tối thiểu theo sao kê']
			}
		],
		commissionPolicy: {
			orderStatus: 'Ghi nhận hoa hồng',
			description:
				'Có thể tiến hành lên lệnh rút tiền khi trạng thái đơn trên báo cáo là "Ghi nhận hoa hồng"',
			commissions: ['500,000 đ/ thẻ phát hành thành công hạn mức > 0 đồng.'],
			note: 'Chưa trừ 10% thuế TNCN.'
		},
		recognitionRules: {
			summary:
				'Khách hàng được ghi nhận giới thiệu thành công nếu trong vòng (≤) 30 ngày kể từ ngày được giới thiệu thỏa tất cả điều kiện sau:',
			description: [
				'Mỗi khách hàng chỉ được tính 01 thẻ duy nhất.',
				'Thẻ được phê duyệt hạn mức thành công (hạn mức >= 0).'
			]
		},
		registrationProcess: [
			'B1: Khách hàng click vào link được publisher giới thiệu, hoàn tất điền thông tin.',
			'B2: Hoàn tất thông tin đăng ký.',
			'B3: Chờ thẩm định và phê duyệt.',
			'B54 Phê duyệt và phát hành thành công => ghi nhận hoa hồng'
		],
		rejectReason: [
			'Khách hàng nhập sai thông tin, giả mạo hồ sơ của người khác;',
			'Khách hàng nợ xấu, có 2 khoản vay tại công ty tài chính được cấp phép hoặc ngân hàng;',
			'Khách hàng đang vay nóng tại các app, website online…;',
			'Khách hàng chưa thỏa mãn các điều kiện theo chính sách phê duyệt tín dụng của ngân hàng VIB tại từng thời kỳ.'
		],
		unqualifiedRecords: [
			'Mở thẻ cho khách lấy hoa hồng, khách không kích hoạt thẻ và dùng thẻ;',
			'Mở thẻ chỉ rút tiền mặt, đáo hạn khoản vay hoặc thẻ tín dụng khác.'
		]
	},
	// #endregion
	// #region:Vibfin
	{
		categoryId: creditCardCategoryId,
		code: 'vibfin',
		name: 'VIB - Financial Free',
		advertiser: 'Ngân hàng TMCP Quốc tế Việt Nam',
		link: 'https://www.vib.com.vn/vn/the-tin-dung/dang-ky/buoc-1?card_type=vib-financial-free&utm_source=REFERCARD&utm_medium=REFER_CARD&utm_content=Affiliate_FIMIVIB-{{orderId}}',
		images: [
			{
				key: 'campaigns/vibfin_ejooli',
				url: 'https://res.cloudinary.com/dsmg2i2rl/image/upload/c_thumb,w_200,g_face/v1738636430/vibfin_ejooli.svg'
			}
		],
		offers: [
			{
				summary:
					'Ưu đãi lãi suất 0% cho kỳ sao kê 3 tháng đầu tiên trên toàn bộ các giao dịch chi tiêu và rút tiền',
				offers: []
			}
		],
		requirement: {
			minAge: 20,
			maxAge: 65,
			documents: ['CCCD']
		},
		status: 'OPEN',
		info: {
			approveTime: 'Trong vòng 15 phút',
			finalResultTime: '18h ngày T+1',
			supportArea: [
				'Bà Rịa - Vũng Tàu',
				'Bình Dương',
				'Cà Mau',
				'Cần Thơ',
				'Đà Nẵng',
				'Đồng Nai',
				'Hà Nội',
				'Hồ Chí Minh',
				'Khánh Hoà',
				'Quảng Ngãi',
				'Tây Ninh',
				'Thừa Thiên Huế',
				'Hải Phòng',
				'An Giang',
				'Bình Định',
				'Đắk Lắk',
				'Đồng Tháp',
				'Hải Dương',
				'Kiên Giang',
				'Lâm Đồng',
				'Nghệ An',
				'Phú Thọ',
				'Quảng Ninh',
				'Thái Bình',
				'Thái Nguyên',
				'Thanh Hoá',
				'Vĩnh Phúc',
				'Tiền Giang'
			]
		},
		specs: [
			{
				title: 'Thời gian làm việc',
				description: ['Tối thiểu 3 tháng tại đơn vị hiện tại']
			},
			{
				title: 'Lịch sử tín dụng',
				description: ['Không có nợ xấu, nợ chú ý trong vòng 12 tháng gần nhất']
			},
			{
				title: 'Thu nhập',
				description: ['Từ 7,000,000 VNĐ/tháng']
			},
			{
				title: 'Hạn mức',
				description: ['10,000,000 VNĐ - 100,000,000 VNĐ']
			},
			{
				title: 'Thời hạn sử dụng',
				description: ['3 năm kể từ ngày phát hành']
			},
			{
				title: 'Hình thức thanh toán',
				description: ['Toàn bộ dư nợ hoặc thanh toán tối thiểu theo sao kê']
			}
		],
		commissionPolicy: {
			orderStatus: 'Ghi nhận hoa hồng',
			description:
				'Có thể tiến hành lên lệnh rút tiền khi trạng thái đơn trên báo cáo là "Ghi nhận hoa hồng"',
			commissions: ['400,000 đ/ thẻ phát hành thành công hạn mức > 0 đồng.'],
			note: 'Chưa trừ 10% thuế TNCN.'
		},
		recognitionRules: {
			summary:
				'Khách hàng được ghi nhận giới thiệu thành công nếu trong vòng (≤) 30 ngày kể từ ngày được giới thiệu thỏa tất cả điều kiện sau:',
			description: [
				'Mỗi khách hàng chỉ được tính 01 thẻ duy nhất.',
				'Thẻ được phê duyệt hạn mức thành công (hạn mức >= 0).'
			]
		},
		registrationProcess: [
			'B1: Khách hàng click vào link được publisher giới thiệu, hoàn tất điền thông tin.',
			'B2: Hoàn tất thông tin đăng ký.',
			'B3: Chờ thẩm định và phê duyệt.',
			'B54 Phê duyệt và phát hành thành công => ghi nhận hoa hồng'
		],
		rejectReason: [
			'Khách hàng nhập sai thông tin, giả mạo hồ sơ của người khác;',
			'Khách hàng nợ xấu, có 2 khoản vay tại công ty tài chính được cấp phép hoặc ngân hàng;',
			'Khách hàng đang vay nóng tại các app, website online…;',
			'Khách hàng chưa thỏa mãn các điều kiện theo chính sách phê duyệt tín dụng của ngân hàng VIB tại từng thời kỳ.'
		],
		unqualifiedRecords: [
			'Mở thẻ cho khách lấy hoa hồng, khách không kích hoạt thẻ và dùng thẻ;',
			'Mở thẻ chỉ rút tiền mặt, đáo hạn khoản vay hoặc thẻ tín dụng khác.'
		]
	},
	// #endregion
	// #region:Vpbankneo
	{
		categoryId: bankAccountCategoryId,
		code: 'vpbankneo',
		name: 'VPBank NEO',
		advertiser: 'Ngân hàng TMCP Quốc tế Việt Nam',
		link: 'https://vpbankneo.page.link/FIMI1111',
		images: [
			{
				key: 'campaigns/vpbankneo_o3wtpo',
				url: 'https://res.cloudinary.com/dsmg2i2rl/image/upload/c_thumb,w_200,g_face/v1738636435/vpbankneo_o3wtpo.svg'
			}
		],
		offers: [
			{
				summary:
					'Mở tài khoản nhanh chóng chỉ vài phút, không cần ra ngân hàng. Chọn số tài khoản đẹp như ý.',
				offers: []
			}
		],
		requirement: {
			minAge: 20,
			documents: ['CCCD']
		},
		status: 'OPEN',
		info: {
			approveTime: 'Trong vòng 15 phút',
			finalResultTime: '18h ngày T+1',
			supportArea: ['all']
		},
		specs: [
			{
				title: 'Hạn mức thanh toán',
				description: ['Lên đến 2 tỉ đồng/ngày']
			}
		],
		commissionPolicy: {
			orderStatus: 'Ghi nhận hoa hồng',
			description:
				'Có thể tiến hành lên lệnh rút tiền khi trạng thái đơn trên báo cáo là "Ghi nhận hoa hồng"',
			commissions: [
				'Nhận ngay 50,000 khi khách hàng có phát sinh giao dịch thanh toán hóa đơn tối thiểu 20,000đ (*)',
				'Nhận thêm 40,000 khi thỏa điều kiện (*) và khách hàng duy trì số dư casa từ 500,000đ, tháng ghi nhận tối đa M1.',
				'Nhận thêm 70,000 khi thỏa điều kiện (*) KH duy trì số dư casa từ 800,000đ, tháng ghi nhận tối đa M1.'
			],
			note: 'Chưa trừ 10% thuế TNCN.'
		},
		recognitionRules: {
			summary:
				'Khách hàng được ghi nhận giới thiệu thành công nếu trong vòng (≤) 30 ngày kể từ ngày được giới thiệu thỏa tất cả điều kiện sau:',
			description: [
				'Mỗi khách hàng chỉ được tính 01 mã cif duy nhất.',
				'Tài khoản được phê duyệt thành công và phát sinh giao dịch thanh toán tối thiểu 20k.'
			],
			note: 'Các giao dịch được tính là hợp lệ: nạp tiền điện thoại, mua mã thẻ cào, thanh toán hóa đơn, thanh toán trả góp, thanh toán vé máy bay, thanh toán học phí, thanh toán bảo hiểm, thanh toán phí giao thông, nạp tiền chứng khoán.'
		},
		registrationProcess: [
			'B1: Khách hàng click vào link được publisher giới thiệu, hoàn tất điền thông tin.',
			'B2: Hoàn tất thông tin đăng ký.',
			'B3: Chờ thẩm định và phê duyệt.',
			'B4: Thực hiện giao dịch tối thiểu 20,000 đ => ghi nhận hoa hồng.'
		],
		rejectReason: [
			'Khách hàng nhập sai thông tin, giả mạo hồ sơ của người khác;',
			'Khách hàng nợ xấu, có 2 khoản vay tại công ty tài chính được cấp phép hoặc ngân hàng;',
			'Khách hàng đang vay nóng tại các app, website online…;',
			'Khách hàng chưa thỏa mãn các điều kiện theo chính sách phê duyệt tín dụng của ngân hàng VIB tại từng thời kỳ.'
		],
		unqualifiedRecords: [
			'Mở thẻ cho khách lấy hoa hồng, khách không kích hoạt thẻ và dùng thẻ;',
			'Mở thẻ chỉ rút tiền mặt, đáo hạn khoản vay hoặc thẻ tín dụng khác.'
		]
	}
	// #endregion
]

const main = async () => {
	// const loanCategoryId = '67a04d0f004e4bbd529ec056'

	await prisma.campaign.createMany({ data: campaignData })

	// await prisma.partner.create({
	// 	data: {
	// 		code: 'FIMI',
	// 		apiKey: await argon2.hash('b8a66f7d-381e-47f8-afea-83c8b0a1fd3b'),
	// 		prize: {
	// 			origin: 0.95
	// 		}
	// 	}
	// })
	// await prisma.category.createMany({
	// 	data: [
	// 		{
	// 			name: 'Thẻ tín dụng'
	// 		},
	// 		{
	// 			name: 'Tài khoản thanh toán'
	// 		},
	// 		{
	// 			name: 'Vay tín chấp'
	// 		}
	// 	]
	// })
	// console.log({ seedCategory })
}

main()
	.then(async () => {
		await prisma.$disconnect
	})
	.catch(async e => {
		console.error(e)
		await prisma.$disconnect
		process.exit(1)
	})
