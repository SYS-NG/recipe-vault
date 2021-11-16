import RPi.GPIO as GPIO
from picamera import PiCamera
from time import sleep

class cameraDriver():
    def __init__(self):
        self.camera = PiCamera()
    
    @staticmethod
    def _getGPIOConfig():
        """Raspberry Pi GPIO Config"""
        GPIOMode = GPIO.BCM
        CaptureButtonPin = 17
        return {
            'mode' : GPIOMode,
            'capture' : CaptureButtonPin
        }

    @staticmethod
    def _captureImage(self):
        self.camera.capture('./cameraTest.jpg')
    
    def drive(self):
        #Set up RPi GPIO
        RPiConfig = self._getGPIOConfig()
        GPIO.setmode(RPiConfig['mode'])
        GPIO.setup(RPiConfig['capture'], GPIO.IN)

        self.camera.start_preview(alpha = 180)
        sleep(2)
        while True:
            if(GPIO.input(17) == 0):
                self._captureImage()
    
if __name__ == "__main__":
    GPIO.cleanup()
    driver = cameraDriver()
    driver.drive()
