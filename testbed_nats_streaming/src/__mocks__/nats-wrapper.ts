export const natsWrapper = {
  client: {
    publish: jest.fn().mockImplementation((subject: string, data: string, callback: (error: Error | null) => void) => {
      callback(null);
    }),
  },
};
