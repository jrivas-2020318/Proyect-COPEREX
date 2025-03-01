import Company from "../enterprise/enterprise.model.js";
import Category from "../category/category.model.js"

export const registerCompany = async (req, res) => {
    const data = req.body
    const author = req.user.id 
    if (data.category) {
        const categoryExists = await Category.findById(data.category)
        if (!categoryExists) return res.status(404).send({ success: false, message: "Category with ID " + data.category + " not found" })
    }
    const newCompany = new Company({ author, ...data })
    await newCompany.save()

    res.status(201).send({ success: true, message: "Company registered", company: newCompany })
}

  
export const getCompany = async (req, res) => {
  try {
    const { limit = 20, skip = 0 } = req.query
    const companies = await Company.find()
      .populate({ path: "category", select: "title description"})
      .skip(skip)
      .limit(limit)

    return res.send({success: true, message: "Companies found", companies, total: companies.length})
  } catch (error) {
    console.error(err)
    return res.status(500).send({ success: false, message: "General error" })
  }
}

export const getCompanyYearExperience = async (req, res) => {
  try {
    const { limit = 20, skip = 0, sortOrder = 'asc' } = req.query
    const { yearsInBusiness } = req.body

    const sortOption = sortOrder === 'desc' ? -1 : 1;

    const companies = await Company.find({ yearsInBusiness: yearsInBusiness })
      .populate({ path: "category", select: "title description" })
      .skip(parseInt(skip))
      .limit(parseInt(limit))
      .sort({ yearsExperience: sortOption })

    return res.send({
      success: true,
      message: "Companies found by years in business",
      companies,
      total: companies.length
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: "General error"
    })
  }
}




export const getCompanyAsc = async (req, res) => {
  try {
    const { limit = 20, skip = 0 } = req.query

    const companies = await Company.find()
      .populate({ path: "category", select: "title description" })
      .sort({ name: 1 })
      .skip(skip)
      .limit(limit)

    return res.send({ success: true, message: "Companies sorted A-Z", companies, total: companies.length})
  } catch (error) {
    console.error(error);
    return res.status(500).send({ success: false, message: "General error" })
  }
}

export const getCompanyDesc = async (req, res) => {
  try {
    const { limit = 20, skip = 0 } = req.query
    const companies = await Company.find()
      .populate({ path: "category", select: "title description" })
      .sort({ name: -1 })
      .skip(skip)
      .limit(limit)

    return res.send({
      success: true,message: "Companies sorted Z-A", companies, total: companies.length })
  } catch (error) {
    console.error(error)
    return res.status(500).send({ success: false, message: "General error" })
  }
}

export const editCompany = async (req, res) => {
  const updates = Object.keys(req.body)
  try {
    const company = await Company.findById(req.params.id)
    if (!company) {
      return res.status(404).send({ error: "Company not found" })
    }

    if (updates.includes('category') && req.body.category) {
      const categoryExists = await Category.findById(req.body.category)
      if (!categoryExists) {
        return res.status(404).send({ error: "Category with ID " + req.body.category + " not found" })
      }
    }

    updates.forEach((update) => (company[update] = req.body[update]))
    await company.save()

    res.send({ success: true, message: "Company updated successfully", company })
  } catch (error) {
    res.status(400).send({ error: error.message })
  }
}

