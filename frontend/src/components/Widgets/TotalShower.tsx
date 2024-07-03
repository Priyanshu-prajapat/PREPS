import { Box, Stack, Typography } from '@mui/material'

type TotalShowerType = {
    amount?: number,
    text?: string,
}

const TotalShower = ({ amount, text }: TotalShowerType) => {
    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: "primary.dark",
            maxWidth: "50%",
            pb: 2,
            borderRadius: 5
        }}>
            <Stack spacing={3} pt={3} sx={{ textAlign: 'center' }}>
                <Typography variant="h3">
                    {
                        amount ? amount : "--"
                    }
                </Typography>
                <Typography variant='h5'>
                    {
                        text ? text : "Total Amount"
                    }
                </Typography>
            </Stack>
        </Box>
    )
}

export default TotalShower
