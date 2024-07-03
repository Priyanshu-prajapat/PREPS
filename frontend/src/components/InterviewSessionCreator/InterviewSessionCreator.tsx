import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import { TCreateInterviewSession } from '../../types/InterviewSessionTypes'
import { useForm } from 'react-hook-form'
import { TError } from '../../types/AuthUserTypes'
import { UseMutationResult } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

type TInterviewSessionCreatorProps = {
    mutation: UseMutationResult<any, TError, TCreateInterviewSession, unknown>,
}

const InterviewSessionCreator = ({ mutation }: TInterviewSessionCreatorProps) => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm<TCreateInterviewSession>({
        defaultValues: {
            fieldOfInterest: "",
            chosenProfession: "",
            knowledgeLevel: "",
            questionCount: 0,
        }
    })
    const onsubmit = (data: TCreateInterviewSession) => {
        mutation.mutate(data, {
            onSuccess: (data: any) => {
                console.log(data)
                navigate("/dashboard")
            }
        })
    }
    return (
        <Box>
            <form onSubmit={handleSubmit(onsubmit)}>
                <Stack spacing={3}>
                    {/* there this box is repeating. that will be a component in future. */}
                    <Box>
                        <Typography>Field Of Interest</Typography>
                        <TextField
                            autoFocus
                            fullWidth
                            placeholder="Enter the field you interested..."
                            {...register("fieldOfInterest", { required: "Field of interest field is required." })}
                            error={errors.fieldOfInterest ? true : false}
                            helperText={errors.fieldOfInterest && errors.fieldOfInterest.message}
                        />
                    </Box>
                    <Box>
                        <Typography>Choose Profession</Typography>
                        <TextField
                            fullWidth
                            placeholder="Enter the profession..."
                            {...register("chosenProfession", { required: "Choose Profession field is required." })}
                            error={errors.chosenProfession ? true : false}
                            helperText={errors.chosenProfession && errors.chosenProfession.message}
                        />
                    </Box>
                    <Box>
                        <Typography>knowledge Level</Typography>
                        <TextField
                            fullWidth
                            placeholder="Enter the knowledge Level..."
                            {...register("knowledgeLevel", { required: "Knowledge level field is required." })}
                            error={errors.knowledgeLevel ? true : false}
                            helperText={errors.knowledgeLevel && errors.knowledgeLevel.message}
                        />
                    </Box>
                    <Box>
                        <Typography>Questions you want</Typography>
                        <TextField
                            fullWidth
                            type='number'
                            placeholder="Enter number of questions..."
                            {...register("questionCount",
                                {
                                    required: "Number of question field is required.",
                                    min: {
                                        value: 5,
                                        message: "number of questions must be above 5."
                                    }
                                })}
                            error={errors.questionCount ? true : false}
                            helperText={errors.questionCount && errors.questionCount.message}
                        />
                    </Box>
                    <Button
                        type="submit"
                        variant='contained'
                    >
                        Submit
                    </Button>
                    <Typography color='red'>
                        {errors.root && errors.root.message}
                        {mutation.error?.message}
                    </Typography>
                </Stack>
            </form>
        </Box>
    )
}

export { InterviewSessionCreator }
