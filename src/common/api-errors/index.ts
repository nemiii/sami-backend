import { HttpStatus } from '@nestjs/common';

/* eslint-disable @typescript-eslint/no-explicit-any */
const createErrorMessage = (
  message: string,
  code = 1001,
  extraInfo?: string,
  httpStatus: HttpStatus = HttpStatus.BAD_REQUEST,
): ErrorMessageInterface => ({ message, code, extraInfo, httpStatus });

const ApiErrorMessages = {
  NotFound: (identifier: string) =>
    createErrorMessage(`${identifier.toLocaleUpperCase()} not found`),
  AlreadyExists: (identifier: string) =>
    createErrorMessage(`${identifier.toLocaleUpperCase()} already exist`),
  ImapError: createErrorMessage(
    'Error in imap connection, please check imap details',
  ),
  ConnectionType: createErrorMessage('Connection type not supported'),
  SmtpError: createErrorMessage(
    'Error in smtp connection, please check smtp details',
  ),
  BadRequest: (errorMessages?: string) =>
    createErrorMessage('Bad request', 1001, errorMessages),
  UserAlreadyExists: createErrorMessage('User already exists'),
  InvalidCredentials: createErrorMessage(
    'Invalid credentials, please try again',
  ),
  NotAuthorized: createErrorMessage(
    'You are not authorized to perform this action, please try again',
    1010,
  ),
  AlreadyOnboarded: createErrorMessage('User is already onboarded'),
  InternalIssue: createErrorMessage('Something went wrong , please try again'),
  GmailScopeError: createErrorMessage(
    `Please accept "Read, compose, send, and permanently delete all your email from Gmail" prompt while connecting gmail account`,
  ),
  SMTPError: (error: string) =>
    createErrorMessage('Error in smtp connection', 1001, error),
  IMAPError: (error: string) =>
    createErrorMessage('Error in imap connection', 1001, error),
  PermissionDenied: createErrorMessage(
    'You are not eligible to preform this task. Permission Denied',
    1001,
  ),
  EmailAccountConnected: createErrorMessage('Email account already connected'),
  EmailExists: createErrorMessage('Email account already exists', 1001),
  InvalidFile: createErrorMessage('File not valid'),
  BigFile: createErrorMessage(
    'File should not be more than 10mb, please try again',
  ),
  StepWithSameOrGreaterDay: createErrorMessage(
    'Sequence step with same or greater day already exist',
  ),
  AtleastOneStep: createErrorMessage('Sequence should have at least 1 step'),
  SubjectRequiredInFirstStep: createErrorMessage(
    'Subject is required in first step of sequence',
  ),
  NoStepDeleteAsSuccessorStepHasNoSubject: createErrorMessage(
    'Cannot delete this step as its successor step have no subject',
  ),
  AtleastOneVariantRequired: createErrorMessage('Atleast one variant required'),
  MinimumScheduleRequired: createErrorMessage(
    'There should atleas 1 schedule present in account',
  ),
};

interface ErrorMessageInterface {
  code: number;
  message: string;
  extraInfo?: string;
  details?: Record<string, any>;
  httpStatus: HttpStatus;
}

export { ApiErrorMessages, ErrorMessageInterface };
