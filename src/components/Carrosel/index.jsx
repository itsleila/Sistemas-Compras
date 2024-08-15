import React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const DefaultCarrosel = ({ produtos }) => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const itemsPerStep = 3;
  const maxSteps = Math.ceil(produtos.length / itemsPerStep);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <Box sx={{ maxWidth: 1200, flexGrow: 1 }}>
      <Paper
        square
        elevation={0}
        sx={{
          display: 'flex',
          alignItems: 'center',
          height: 50,
          pl: 2,
          bgcolor: 'background.default',
        }}
      >
        {/*  <Typography>{`Produtos ${activeStep * itemsPerStep + 1}-${Math.min(
          (activeStep + 1) * itemsPerStep,
          produtos.length,
        )}`}</Typography>*/}
        <Typography
          sx={{
            fontSize: '1.50rem',
            lineHeight: '1',
          }}
        >
          últimos produtos adicionados
        </Typography>
      </Paper>
      <AutoPlaySwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {Array.from({ length: maxSteps }).map((_, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              justifyContent: 'space-around',
              p: 2,
              bgcolor: '#0b4fff',
              border: '2px solid transparent',
              borderRadius: 1,
            }}
          >
            {produtos
              .slice(index * itemsPerStep, index * itemsPerStep + itemsPerStep)
              .map((produto, subIndex) => (
                <Box
                  key={subIndex}
                  sx={{
                    width: '24rem',
                    display: 'flex',
                    margin: '1rem',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    p: 2,
                    bgcolor: 'background.paper',
                    border: '2px solid transparent',
                    borderRadius: 1,
                  }}
                >
                  <Typography variant="h6">{produto.produto}</Typography>
                  <Typography>{produto.descricao}</Typography>
                </Box>
              ))}
          </Box>
        ))}
      </AutoPlaySwipeableViews>
      <MobileStepper
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            Next
            {theme.direction === 'rtl' ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
    </Box>
  );
};

export default DefaultCarrosel;
