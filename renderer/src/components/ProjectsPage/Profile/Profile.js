import React, { useEffect } from 'react';
import {
  Paper,
  Typography,
  IconButton,
  Grid,
  TextField,
  Box,
  OutlinedInput,
  FormControl,
  InputLabel,
  InputAdornment,
  Select,
  MenuItem,
  Input,
  Button,
} from '@material-ui/core';
import clsx from 'clsx';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { FormattedMessage } from 'react-intl';
import * as localForage from 'localforage';
// import { usePrefs } from 'prefs-rcl';
import AutographaStore from '../../AutographaStore';
import * as logger from '../../../logger';
import { ProfileStyles } from '../useStyles/ProfileStyles';
import useValidator from '../../Validation/useValidator';
import { AutoCompleteSearch } from '../../AutoCompleteSearch/AutoCompleteSearch';
import BadgeAvatars from '../../ApplicationBar/Avatar';

// const localForageConfig = {
//   type: 'localForage',
//   name: 'profile1',
//   maxSize: '5MB',
// };
const region = [
  'Delhi, India',
  'Helsinki, Finland',
  'New York, United States',
  'Morocco, North Africa',
];

const Profile = () => {
  const classes = ProfileStyles();
  const [values, setValues] = React.useState({
    password: '',
    showPassword: false,
  });
  const [appLang, setAppLang] = React.useState('en');
  const [avatarPathImport, setavatarPathImport] = React.useState('');
  const [firstname, setFirstname] = React.useState('');
  const [lastname, setLastname] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [selregion, setRegion] = React.useState('');
  const [saved, setSaved] = React.useState('');
  const {
    state: {
      formValid,
      errorCount,
      errors,
    },
    action: {
      handleFields,
      handleSubmitFields,
    },

  } = useValidator();

  // const {
  //   action: {
  //     // readItem,
  //     setItem,
  //     // deleteItem,
  //     // custom,
  //   },
  // } = usePrefs({
  //   backendfn: localForageConfig,
  // });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
    handleFields(event);
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const changeLangauge = (event) => {
    setAppLang(event.target.value);
  };

  const openFileDialogAvatarData = async ({ target }) => {
    logger.debug('Profile.js', 'dialog opens to update avatar');
    if (target.files[0] !== undefined) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(target.files[0]);
      fileReader.onload = async (e) => {
        localForage.setItem('avatarPath', e.target.result, (err) => {
          localForage.getItem('avatarPath', (value) => {
            setavatarPathImport(value);
            AutographaStore.avatarPath = value;
            logger.debug('Profile.js', 'updated avatar');
            if (err) {
              logger.error('Profile.js', 'failed to update avatar');
            }
          });
        });
      };
    }
  };

  const removeAvatar = () => {
    logger.debug('Profile.js', 'event to remove avatar');
    localForage.setItem('avatarPath', '', (err) => {
      localForage.getItem('avatarPath', (value) => {
        setavatarPathImport(value);
        AutographaStore.avatarPath = value;
        if (err) {
          logger.error('Profile.js', 'error while removing avatar');
        }
      });
      if (err) {
        logger.error('Profile.js', 'error while removing avatar');
      }
    });
  };

  useEffect(() => {
    localForage.getItem('avatarPath', (err, value) => {
      setavatarPathImport(value);
      AutographaStore.avatarPath = value;
      if (err) {
        logger.error('Profile.js', 'error in setting avatar on mount');
      }
    });
  }, [avatarPathImport]);

  useEffect(() => {
    localForage.getItem('avatarPath', (err, value) => {
      setavatarPathImport(value);
      AutographaStore.avatarPath = value;
      if (err) {
        logger.error('Profile.js', 'error in setting avatar on mount');
      }
    });
  }, []);

  useEffect(() => {
    localForage.getItem('profileSettings', async (err, value) => {
      if (value) {
        value.forEach((fields) => {
          setFirstname(fields.firstname);
          setLastname(fields.lastname);
          setEmail(fields.email);
          setRegion(fields.region);
          setValues({ ...values, password: fields.password });
          logger.debug('Profile.js', 'setting the saved profile values');
        });
      }
      if (err) {
        logger.error('Profile.js', 'error in getting saved values');
      }
    });
    // eslint-disable-next-line
  },[])

  const handleSubmit = (e) => {
    handleSubmitFields(e);
    const profileSettings = [
      {
        password: values.password,
        firstname,
        lastname,
        region: selregion,
        email,
        appLang,
      },
    ];
    if (!saved) { setSaved(profileSettings); }
    if (errorCount !== null && formValid) {
      // setItem({
      //   key: 'profileSettings',
      //   values: profileSettings,
      //   tag: 'projectspage',
      // });
      localForage.setItem('profileSettings', profileSettings, () => {
        localForage.getItem('profileSettings', (err, value) => {
          setSaved(value);
          logger.debug('Profile.js', 'Profile fields saved successfully');
          if (err) {
            logger.error('Profile.js', 'Failed in saving field values');
          }
        });
      });
      localForage.getItem('applang', (err) => {
        localForage.setItem('applang', appLang, () => {
          if (err) {
            logger.error('Profile.js', 'Failed to change language');
          }
          logger.debug('Profile.js', 'Language changed app reloads');
          window.location.reload();
        });
      });
    }
  };

  return (
    <>
      <Paper data-test="component-profile">
        <Grid container spacing={3}>
          <Grid item xs={2} />
          <Grid item xs>
            <BadgeAvatars
              path={avatarPathImport}
              alt="Remy Sharp"
              status="offline"
              size={classes.avatarlarge}
            />
            <div className={classes.avataredits}>
              <IconButton variant="contained" component="label">
                <EditIcon />
                <Input
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={openFileDialogAvatarData}
                />
              </IconButton>
              <IconButton aria-label="delete" onClick={removeAvatar}>
                <DeleteForeverIcon />
              </IconButton>
            </div>
          </Grid>
          <Grid item xs={7}>
            <form
              className={classes.personalinfo}
              noValidate
              autoComplete="off"
              onSubmit={(e) => handleSubmit(e)}
            >
              <Typography
                className={classes.title}
                variant="h6"
                color="inherit"
              >
                <Box fontWeight={600} m={1}>
                  <FormattedMessage id="label-personal-information" />
                </Box>
              </Typography>
              <FormattedMessage id="label-first-name">
                {(message) => (
                  <TextField
                    // error={errors.namefield === "" ? false : true}
                    className={classes.textfieldsmall}
                    label={message}
                    name="namefield"
                    variant="outlined"
                    type="text"
                    inputProps={{
                      'data-testid': 'firstnamefield',
                    }}
                    value={firstname}
                    helperText={errors.namefield}
                    onChange={(e) => {
                      setFirstname(e.target.value);
                      handleFields(e);
                    }}
                  />
                )}
              </FormattedMessage>
              <FormattedMessage id="label-last-name">
                {(message) => (
                  <TextField
                    className={classes.textfieldsmall}
                    label={message}
                    name="lastname"
                    variant="outlined"
                    inputProps={{
                      'data-testid': 'lastnamefield',
                    }}
                    value={lastname}
                    helperText={errors.lastname}
                    onChange={(e) => {
                      setLastname(e.target.value);
                      handleFields(e);
                    }}
                  />
                )}
              </FormattedMessage>
              <div>
                <FormattedMessage id="label-email">
                  {(message) => (
                    <TextField
                      className={classes.textfieldlong}
                      label={message}
                      name="email"
                      variant="outlined"
                      inputProps={{
                        'data-testid': 'emailfield',
                      }}
                      value={email}
                      helperText={errors.email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        handleFields(e);
                      }}
                    />
                  )}
                </FormattedMessage>
              </div>
              <div>
                <FormControl
                  variant="outlined"
                  className={classes.textfieldlong}
                >
                  <AutoCompleteSearch
                    id="Region"
                    listarray={region}
                    customPlaceholder="Region"
                    selectedValue={selregion}
                    setSelectedValue={setRegion}
                  />
                </FormControl>
              </div>
              <div>
                <FormControl
                  className={
                    (clsx(classes.margin, classes.textField),
                    classes.textfieldlong)
                  }
                  variant="outlined"
                >
                  <InputLabel htmlFor="outlined-adornment-password">
                    <FormattedMessage id="label-password" />
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={values.showPassword ? 'text' : 'password'}
                    value={values.password}
                    name="password"
                    onChange={handleChange('password')}
                    inputProps={{
                      'data-testid': 'passwordbox',
                    }}
                    endAdornment={(
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {values.showPassword ? (
                            <Visibility />
                          ) : (
                            <VisibilityOff />
                          )}
                        </IconButton>
                      </InputAdornment>
                    )}
                    labelWidth={70}
                  />
                  <span>{errors.password}</span>
                </FormControl>
              </div>
              <Typography
                className={classes.title}
                variant="h6"
                color="inherit"
              >
                <Box fontWeight={600} m={2}>
                  <FormattedMessage id="label-language" />
                </Box>
              </Typography>
              <div>
                <FormControl
                  variant="outlined"
                  className={classes.textfieldlong}
                >
                  <Select
                    className={classes.formControl}
                    id="localeList"
                    value={appLang}
                    onChange={changeLangauge}
                  >
                    <MenuItem value="en">English</MenuItem>
                    <MenuItem value="hi">Hindi</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <Button
                className={classes.save}
                variant="contained"
                color="primary"
                data-testid="submit-button"
                type="submit"
              >
                Save
              </Button>
            </form>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};
export default Profile;
