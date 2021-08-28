import pino from "pino"

interface LoggingMetadata {
  when: Date
}

interface Logger {
  info(message: string, metadata: LoggingMetadata): any
  error(error: Error): any
}

class PinoWrapper implements Logger {
  private readonly logger = pino()
  info(message: string, metadata: any = { when: new Date() }) {
    this.logger.info(metadata, message)
  }
  error(err: Error) {
    this.logger.error(err, err.message)
  }
}

const logger = new PinoWrapper()

export default logger
