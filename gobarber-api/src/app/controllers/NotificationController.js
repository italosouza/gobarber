import User from '../models/User'
import Notification from '../schemas/Notification'

class NotificationController {
  async index(req, res) {
    const checkIsProvider = await User.findOne({
      where: { id: req.userId, provider: true },
    })

    if (!checkIsProvider) {
      return res.status(401).json({ error: 'Only provider can load notifications' })
    }

    const notification = await Notification.find({
      user: req.userId,
    })
      .sort({ createdAt: 'desc' })
      .limit(20)

    return res.json(notification)
    // return res.json([
    //   {
    //     _id: "1",
    //     content: "Novo agendamento do João da Silva Sauron para o dia 10 de julho, as 20h",
    //     read: false,
    //     createdAt: "2019-08-18T23:59:55.913Z",
    //     updatedAt: "2019-08-18T23:59:55.913Z"
    //   },
    //   {
    //     _id: "2",
    //     content: "Novo agendamento do João da Silva Sauron para o dia 10 de julho, as 20h",
    //     read: true,
    //     createdAt: "2019-08-18T23:59:55.913Z",
    //     updatedAt: "2019-08-18T23:59:55.913Z"
    //   },
    // ])
  }

  async update(req, res) {
    const notification = await Notification.findByIdAndUpdate(req.params.id, { read: true }, { new: true })
    return res.json(notification)
  }
}

export default new NotificationController()
