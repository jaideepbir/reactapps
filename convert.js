const hbjs = require('handbrake-js')

const options = { 
    input: 'c259890a515277af4ad34e01ba60a4f911fe927b.ts', 
    output: 'soulMiracle.mp4',
    // 'start-at': "duration:10",
    // 'stop-at': "duration:20"
 };

hbjs.spawn(options)
  .on('error', err => {
    // invalid user input, no video found etc
  })
  .on('progress', progress => {
    console.log(
      'Percent complete: %s, ETA: %s',
      progress.percentComplete,
      progress.eta
    )
  })