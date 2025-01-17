import { BullModule } from '@nestjs/bullmq'
import { Module } from '@nestjs/common'

import { OTP_QUEUE_NAME, QueuePrefix } from '@/constants/queue.constant'
import { OtpProcessor } from '@/modules/queues/processors/otp.processor'
import { QueuesService } from '@/modules/queues/queues.service'
import { ResetPasswordTokenService } from '@/modules/tokens/services/reset-password-token.service'
import { VerificationTokenService } from '@/modules/tokens/services/verification-token.service'
import { ApiConfigService } from '@/shared/services/api-config.service'
import { PrismaService } from '@/shared/services/prisma.service'

@Module({
	imports: [
		BullModule.registerQueue({
			name: OTP_QUEUE_NAME,
			prefix: QueuePrefix.AUTH
		})
	],
	providers: [
		ApiConfigService,
		PrismaService,
		VerificationTokenService,
		ResetPasswordTokenService,
		OtpProcessor,
		QueuesService
	]
})
export class QueuesModule {}
