import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to create a new appointment', async () => {
    const appoinment = await createAppointment.execute({
      date: new Date(),
      provider_id: '123123123',
      user_id: '123123123',
    });

    expect(appoinment).toHaveProperty('id');
    expect(appoinment.provider_id).toBe('123123123');
  });

  it('should not be able to create two appointment on the same time', async () => {
    const appoinmentDate = new Date(2020, 4, 10, 11);

    const appoinment = await createAppointment.execute({
      date: appoinmentDate,
      provider_id: '123123123',
      user_id: '123123123',
    });

    await expect(
      createAppointment.execute({
        date: appoinmentDate,
        provider_id: '123123123',
        user_id: '123123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
