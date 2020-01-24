const Duration = function (durationMs) {
  this.durationMs = durationMs
};

Duration.MS = 1
Duration.SECOND = 1000
Duration.MIN = 60 * Duration.SECOND
Duration.HOUR = 60 * Duration.MIN
Duration.DAY = 24 * Duration.HOUR

Duration.fromMS = milliSeconds => new Duration(milliSeconds)
Duration.fromSeconds = seconds => Duration.fromMS(seconds * Duration.SECOND)
Duration.fromMinutes = minutes => Duration.fromMS(minutes * Duration.MIN)
Duration.fromHours = hours => Duration.fromMS(hours * Duration.HOUR)
Duration.fromDays = days => Duration.fromMS(days * Duration.DAY)
Duration.fromIsoTime = isoTime => {
  const parts = isoTime.split(':').map(Number)
  const hour = parts[0]
  const minutes = parts[1]
  const seconds = parts[2]
  const milliseconds = parts[3] || 0
  return Duration.fromMS((hour * Duration.HOUR) + (minutes * Duration.MIN) + (seconds * Duration.SECOND) + milliseconds)

}
Duration.prototype.toMS = function () {
  return this.durationMs
}
Duration.prototype.asUnit = function (unit) {
  return Number(this.durationMs / unit)
}
export { Duration };
