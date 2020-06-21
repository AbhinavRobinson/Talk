import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import Button from '@material-ui/core/Button'

import StepLabel from '@material-ui/core/StepLabel'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'

import Face from './FormSteps/Face'
import Details from './FormSteps/Details'
import Final from './FormSteps/FInal'

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
	},
	button: {
		marginRight: theme.spacing(1),
	},
	instructions: {
		// marginTop: theme.spacing(1),
		// marginBottom: theme.spacing(1),
	},
	buttonSet: {
		marginTop: 10,
	},
}))

function getSteps() {
	return ['User Details', 'Register Face', 'Submit']
}

function getStepContent(step) {
	switch (step) {
		case 0:
			return (
				<Container fixed>
					<Details></Details>
				</Container>
			)
		case 1:
			return (
				<Container fixed>
					<Face></Face>
				</Container>
			)
		case 2:
			return <Final></Final>
		default:
			return 'Unknown step error'
	}
}

export default function New() {
	const classes = useStyles()
	const [activeStep, setActiveStep] = React.useState(0)
	const [skipped, setSkipped] = React.useState(new Set())
	const steps = getSteps()

	const isStepOptional = (step) => {
		// return step === 1;
	}

	const isStepSkipped = (step) => {
		return skipped.has(step)
	}

	const handleNext = () => {
		let newSkipped = skipped
		if (isStepSkipped(activeStep)) {
			newSkipped = new Set(newSkipped.values())
			newSkipped.delete(activeStep)
		}

		setActiveStep((prevActiveStep) => prevActiveStep + 1)
		setSkipped(newSkipped)
	}

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1)
	}

	const handleSkip = () => {
		if (!isStepOptional(activeStep)) {
			throw new Error("You can't skip a step that isn't optional.")
		}

		setActiveStep((prevActiveStep) => prevActiveStep + 1)
		setSkipped((prevSkipped) => {
			const newSkipped = new Set(prevSkipped.values())
			newSkipped.add(activeStep)
			return newSkipped
		})
	}

	const handleReset = () => {
		setActiveStep(0)
	}

	return (
		<div className={classes.root}>
			<Stepper activeStep={activeStep}>
				{steps.map((label, index) => {
					const stepProps = {}
					const labelProps = {}
					if (isStepOptional(index)) {
						labelProps.optional = (
							<Typography variant='caption'>Optional</Typography>
						)
					}
					if (isStepSkipped(index)) {
						stepProps.completed = false
					}
					return (
						<Step key={label} {...stepProps}>
							<StepLabel {...labelProps}>{label}</StepLabel>
						</Step>
					)
				})}
			</Stepper>
			<div>
				{activeStep === steps.length ? (
					<div>
						<Typography className={classes.instructions}>
							All steps completed - you&apos;re finished
						</Typography>
						<Button
							onClick={handleReset}
							className={classes.button}
						>
							Reset
						</Button>
					</div>
				) : (
					<div>
						<Typography className={classes.instructions}>
							{getStepContent(activeStep)}
						</Typography>
						<div className={classes.buttonSet}>
							<Button
								disabled={activeStep === 0}
								onClick={handleBack}
								className={classes.button}
							>
								Back
							</Button>
							{isStepOptional(activeStep) && (
								<Button
									variant='contained'
									color='primary'
									onClick={handleSkip}
									getStepContent
									className={classes.button}
								>
									Skip
								</Button>
							)}

							<Button
								variant='contained'
								color='primary'
								onClick={handleNext}
								className={classes.button}
							>
								{activeStep === steps.length - 1
									? 'Finish'
									: 'COnfirm'}
							</Button>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}
